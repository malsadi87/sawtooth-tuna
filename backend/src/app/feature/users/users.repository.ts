import { Repository, EntityRepository } from "typeorm";
import { UsersEntity } from "../../../entity/users.entity";
import { AuthCredential } from "../../utility/dto/authCredential.dto";

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {

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