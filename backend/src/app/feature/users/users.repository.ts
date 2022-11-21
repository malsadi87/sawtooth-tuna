import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UsersEntity } from "../../../entity/users.entity";
import { AuthCredential } from "../../utility/dto/auth-credential.dto";
import * as crypto from 'crypto';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
    constructor(private dataSource: DataSource) {
        super(UsersEntity, dataSource.createEntityManager());
    }
    
    public async validateCredential(credential: AuthCredential): Promise<boolean> {
        const { email, password } = credential;

        let user: UsersEntity = await this.findOneBy({ email: email, emailConfirmed: true });
        if (user && user.passwordHash == this.hash(password)) {
            return true;
        }
        return false;
    }

    private hash(data: any): string {
        return crypto.createHash('sha512').update(data).digest('hex').toLowerCase();
    }

    public async resetPassword(email: string, newPassword: string): Promise<boolean> {
        const user = await this.getUserByEmail(email);
        user.updatedDate = new Date();
        user.passwordHash = this.hash(newPassword);
        const updateUser = await user.save();
        return updateUser != null;
    }

    public async updateUserEmailConfirmtaion(user: UsersEntity, confirmationType: boolean): Promise<boolean> {
        user.emailConfirmed = confirmationType;
        user.updatedDate = new Date();
        const updatedUser = await user.save();
        return updatedUser != null;
    }

    public async updateUserBlockChainInfoId(user: UsersEntity, blockChainInfoId: string): Promise<Boolean> {
        user.blockchainInfoId = blockChainInfoId;
        user.updatedDate = new Date();
        const updateUser = await user.save();
        return updateUser != null;
    }

    public async getUserByEmail(email: string): Promise<UsersEntity> {
        const user = await this.findOneBy({ email: email });
        return user;
    }
}