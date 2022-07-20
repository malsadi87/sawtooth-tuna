import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../utility/strategy/jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt-config');
const { JWT_SECRET } = process.env;
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    passportModule,
    TypeOrmModule.forFeature([AuthRepository])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule]
})
export class AuthModule {}
