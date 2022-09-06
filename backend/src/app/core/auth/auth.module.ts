import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../utility/strategy/jwt.strategy';
import * as config from 'config';
import { UsersModule } from '../../feature/users/users.module';

const jwtConfig = config.get('jwt-config');
const { JWT_SECRET } = process.env;
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    passportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule]
})
export class AuthModule {}
