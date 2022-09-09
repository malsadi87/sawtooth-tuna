import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UsersEntity } from "../../../entity/users.entity";
import { AuthCredential } from "../../utility/dto/authCredential.dto";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
    constructor(private dataSource: DataSource) {
        super(UsersEntity, dataSource.createEntityManager());
    }
    
    public async validateCredential(credential: AuthCredential): Promise<boolean> {
        const { email, password } = credential;

        // let user: UsersEntity = await this.findOne({ email });
        let user: UsersEntity = null;
        if (user && user.passwordHash == password) {
            return true;
        }
        return false;
    }

    public async getUserByEmail(email: string): Promise<UsersEntity> {
        // const user = await this.findOne({ email });
        const user: UsersEntity = null;
        return user;
    }
}