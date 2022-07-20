import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../../core/auth/auth.repository';
import { UsersEntity } from '../../../entity/users.entity';

const { JWT_SECRET } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        });
    }

    public async validate(payload: any) {
        const { email } = payload;

        const user: UsersEntity = await this.authRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user.email;
    }
}