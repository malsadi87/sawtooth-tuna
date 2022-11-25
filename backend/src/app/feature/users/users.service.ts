import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersEntity } from '../../../entity/users.entity';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { UserCreationDto } from '../../utility/dto/user-creation.dto';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UsersBlockchainInfoService } from '../usersBlockchainInfo/users-blockchain-info.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private readonly dataScource: DataSource,
        private readonly usersBlockchainInfoService: UsersBlockchainInfoService
    ) { }

    private hash(data: any): string {
        return crypto.createHash('sha512').update(data).digest('hex').toLowerCase();
    }

    public async validateCredential(authCredential: AuthCredential): Promise<boolean> {
        const isValidate = await this.usersRepository.validateCredential(authCredential);
        return isValidate;
    }

    public async getUserByEmail(email: string): Promise<UsersEntity> {
        return await this.usersRepository.getUserByEmail(email);
    }

    public async resetPassword(email: string, newPassword: string): Promise<boolean> {
        return await this.usersRepository.resetPassword(email, newPassword);
    }

    public async validateExistingEmail(email: string): Promise<UsersEntity> {
        const user = await this.getUserByEmail(email);

        if(!user)
            throw new BadRequestException(`No, existing user found with email ${email}. Please sign-up first!`);
        return user;
    }

    public async updateUserEmailConfirmation(email: string, type: boolean): Promise<UsersEntity> {
        const user = await this.getUserByEmail(email);

        const updateResult = await this.usersRepository.updateUserEmailConfirmtaion(user, type);
        if (!updateResult)
            throw new InternalServerErrorException('Something went wrong! Try again after couple of minutes');
        return user;
    }

    // Invalid implementation
    // Should only contains business logic
    public async updateUserBlockChainInfo(user: UsersEntity, chainPublicKey: string = null, chainPrivateKey: string = null): Promise<UsersEntity> {
        
        await this.dataScource.transaction(async manager => {
            if (chainPublicKey && chainPrivateKey) {
                const blockChainInfoId = await this.usersBlockchainInfoService.addNewKeyToUser(user.id, chainPublicKey, chainPrivateKey);
                await this.usersRepository.updateUserBlockChainInfoId(user, blockChainInfoId);
            }
        });

        return user;
    }

    // Invalid implementation
    // Should only contains business logic
    public async addUser(userPayload: UserCreationDto): Promise<{ user: UsersEntity }> {
        try {
            const existingUser = await this.getUserByEmail(userPayload.email);
            if (existingUser)
                throw new BadRequestException(`User already exist with email - ${existingUser.email}`);

            let userObj: UsersEntity = plainToClass(UsersEntity, userPayload);
            userObj.isActive = true;
            userObj.emailConfirmed = false;
            userObj.createdDate = new Date();
            userObj.updatedDate = new Date();
            userObj.phoneNumberConfirmed = false;
            userObj.twoFactorEnabled = false;
            userObj.lockoutEnabled = false;
            userObj.accessFailedCount = 0;
            userObj.passwordHash = this.hash(userObj.password);
    
            await this.dataScource.transaction(async manager => {
                userObj = await manager.save(userObj);
            });
    
            const result = { user: userObj }
            return result;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}