// import { Repository, EntityRepository } from "typeorm";
// import { AuthCredential } from "src/app/utility/dto/authCredential.dto";
// import { B360UserEntity } from "src/entity/b360_user.entity";

// @EntityRepository(B360UserEntity)
// export class AuthRepository extends Repository<B360UserEntity>{

//     public async validateCredential(credential: AuthCredential): Promise<boolean> {
//         const { email, password } = credential;

//         let user: B360UserEntity = await this.findOne({ email });
//         if (user && user.password == password) {
//             return true;
//         }
//         return false;
//     }
// }