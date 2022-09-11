import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../feature/users/users.service';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { JwtPayload } from '../../utility/vm/jwtPayload.vm';

@Injectable()
export class IdentityService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateCredential(authCredential: AuthCredential): Promise<string> {
        const isValidate = await this.usersService.validateCredential(authCredential);
        if (!isValidate) {
            throw new UnauthorizedException('Invalid Credential');
        }
        
        const payload: JwtPayload = JSON.parse(JSON.stringify({ email: authCredential.email }));
        return this.jwtService.sign(payload);
    }
}
