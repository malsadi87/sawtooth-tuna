import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UsersEntity } from "../../../entity/users.entity";
import { AuthCredential } from "../../utility/dto/auth-credential.dto";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
    constructor(private dataSource: DataSource) {
        super(UsersEntity, dataSource.createEntityManager());
    }
    
    public async validateCredential(credential: AuthCredential): Promise<boolean> {
        const { email, password } = credential;

        let user: UsersEntity = await this.findOneBy({ email: email });
        if (user && user.passwordHash == password) {
            return true;
        }
        return false;
    }

    public async getUserByEmail(email: string): Promise<UsersEntity> {
        const user = await this.findOneBy({ email: email });
        return user;
    }
}