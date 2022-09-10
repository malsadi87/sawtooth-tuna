import { Injectable } from '@nestjs/common';
import { UserRolesEntity } from '../../../entity/userRoles.entity';
import { UsersEntity } from '../../../entity/users.entity';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { UserCreationDto } from '../../utility/dto/user-creation.dto';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private readonly dataScource: DataSource
    ) { }

    async validateCredential(authCredential: AuthCredential): Promise<boolean> {
        const isValidate = await this.usersRepository.validateCredential(authCredential);
        return isValidate;
    }

    async getUserByEmail(email: string): Promise<UsersEntity> {
        return await this.usersRepository.getUserByEmail(email);
    }

    async addUser(userPayload: UserCreationDto): Promise<{ user: UsersEntity }> {
        try {
            let userObj: UsersEntity = plainToClass(UsersEntity, userPayload);
            // const userPermissionObj: UserRolesEntity = plainToClass(UserRolesEntity, userPayload)
    
            // let user: UsersEntity = new UsersEntity();
            // let resp2: UserRolesEntity = new UserRolesEntity();
    
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
                // userPermissionObj.user_id = resp1.id;
                // resp2 = await manager.save(userPermissionObj);
            });
    
            const result = { user: userObj, /*permission: resp2*/ }
            return result;
        } catch(e) {
            console.log(e);
        }
    }

    // async updatePermission(userId: number, orgId: number, userPermission: any): Promise<any> {
    //     return await this.userOrgPermissionRepository.updatePermission(userId, orgId, userPermission);
    // }
}