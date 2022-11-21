import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersEntity } from '../../../entity/users.entity';
import { UsersService } from '../../feature/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService, config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('env.JWT_SECRET')
        });
    }

    public async validate(payload: any) {
        const { email } = payload;

        const user: UsersEntity = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user.email;
    }
}