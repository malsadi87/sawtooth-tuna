import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../feature/users/users.module';
import { JwtStrategy } from '../../utility/strategy/jwt.strategy';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { SawtoothModule } from '../sawtooth/sawtooth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from '../../utility/interceptor/request.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from 'src/app/shared/mail/awsmail.module';
import { MailService } from 'src/app/shared/mail/awsmail.service';
// import * as config from 'config';
// const jwtConfig = config.get<any>('jwt-config');
// const { JWT_SECRET } = process.env;

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    MailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('env.JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<number>('jwt-config.expiresIn')
        }
      })
    }),
    UsersModule,
    SawtoothModule,
    passportModule
  ],
  controllers: [IdentityController],
  providers: [
    MailService,
    IdentityService, 
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor
    }
  ],
  exports: [passportModule]
})
export class IdentityModule {}
