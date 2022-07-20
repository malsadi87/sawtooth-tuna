import { Repository, EntityRepository } from "typeorm";
import { UsersEntity } from "../../../entity/users.entity";
import { AuthCredential } from "../../utility/dto/authCredential.dto";

@EntityRepository(UsersEntity)
export class AuthRepository {
    
}