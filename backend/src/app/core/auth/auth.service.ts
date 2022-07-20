// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { AuthRepository } from './auth.repository';
// import { AuthCredential } from '../../utility/dto/authCredential.dto';
// import { JwtPayload } from '../../utility/vm/jwtPayload.vm';

// @Injectable()
// export class AuthService {
//     constructor(
//         @InjectRepository(AuthRepository)
//         private authRepository: AuthRepository,
//         private jwtService: JwtService
//     ) { }

//     async validateCredential(authCredential: AuthCredential): Promise<{ accessToken: string }> {
//         const isValidate = await this.authRepository.validateCredential(authCredential);
//         if (!isValidate) {
//             throw new UnauthorizedException('Invalid Credential');
//         }
//         const payload: JwtPayload = JSON.parse(JSON.stringify({ email: authCredential.email }));
//         const accessToken = await this.jwtService.sign(payload);
//         return { accessToken };
//     }
// }