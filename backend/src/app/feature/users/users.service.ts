import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../../entity/users.entity';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { UserCreationDto } from '../../utility/dto/user-creation.dto';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UsersBlockchainInfoService } from '../usersBlockchainInfo/users-blockchain-info.service';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private readonly dataScource: DataSource,
        private readonly usersBlockchainInfoService: UsersBlockchainInfoService
    ) { }

    public async validateCredential(authCredential: AuthCredential): Promise<boolean> {
        const isValidate = await this.usersRepository.validateCredential(authCredential);
        return isValidate;
    }

    public async getUserByEmail(email: string): Promise<UsersEntity> {
        return await this.usersRepository.getUserByEmail(email);
    }

    public async updateUserBlockChainInfo(user: UsersEntity, chainPublicKey: string = null, chainPrivateKey: string = null): Promise<UsersEntity> {
        
        await this.dataScource.transaction(async manager => {
            if (chainPublicKey && chainPrivateKey) {
                const blockChainInfoId = await this.usersBlockchainInfoService.addNewKeyToUser(user.id, chainPublicKey, chainPrivateKey);
                await this.usersRepository.updateUserBlockChainInfoId(user, blockChainInfoId);
            }
        });

        return user;
    }

    public async addUser(userPayload: UserCreationDto): Promise<{ user: UsersEntity }> {
        try {
            let userObj: UsersEntity = plainToClass(UsersEntity, userPayload);
            userObj.isActive = true;
            userObj.emailConfirmed = false;
            userObj.createdDate = new Date();
            userObj.updatedDate = new Date();
            userObj.phoneNumberConfirmed = false;
            userObj.twoFactorEnabled = false;
            userObj.lockoutEnabled = false;
            userObj.accessFailedCount = 0;
    
            await this.dataScource.transaction(async manager => {
                userObj = await manager.save(userObj);
            });
    
            const result = { user: userObj }
            return result;
        } catch(e) {
            console.log(e);
        }
    }
}