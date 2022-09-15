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
        
        var user = await this.usersService.getUserByEmail(authCredential.email);
        const payload: JwtPayload = JSON.parse(JSON.stringify({ 
            email: authCredential.email, 
            id: user.id,
            fullName: user.fullName,
            token_type: 'Bearer'
        }));
        return this.jwtService.sign(payload);
    }
}
