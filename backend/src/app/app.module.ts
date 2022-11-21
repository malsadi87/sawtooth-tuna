import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { typeOrmConfig } from '../environments/db/typeorm.config';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';
import { UtilityModule } from './utility/utility.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ApiExceptionFilter } from './utility/filter/api-exception-filter.filter';
import { JwtAuthGuard } from './utility/guard/JwtAuth.guard';
import { RequestPayloadValidationPipe } from './utility/pipe/request-Payload.pipe';
import configuration from 'config/configuration';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    FeatureModule,
    UtilityModule,
    ConfigModule.forRoot({
      load:[configuration],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => typeOrmConfig(configService)
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: RequestPayloadValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
