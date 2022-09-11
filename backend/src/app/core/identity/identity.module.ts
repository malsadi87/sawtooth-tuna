import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../feature/users/users.module';
import { JwtStrategy } from '../../utility/strategy/jwt.strategy';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import * as config from 'config';
import { SawtoothModule } from '../sawtooth/sawtooth.module';

const jwtConfig = config.get<any>('jwt-config');
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
    UsersModule,
    SawtoothModule,
    passportModule
  ],
  controllers: [IdentityController],
  providers: [IdentityService, JwtStrategy],
  exports: [passportModule]
})
export class IdentityModule {}
