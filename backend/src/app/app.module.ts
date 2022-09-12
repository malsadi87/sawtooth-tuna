import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { typeOrmConfig } from '../environments/db/typeorm.config';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';
import { UtilityModule } from './utility/utility.module';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ApiExceptionFilter } from './utility/filter/api-exception-filter.filter';
import { JwtAuthGuard } from './utility/guard/JwtAuth.guard';
import { RequestPayloadValidationPipe } from './utility/pipe/request-Payload.pipe';
import { RequestInterceptor } from './utility/interceptor/request.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CoreModule,
    SharedModule,
    FeatureModule,
    UtilityModule,
    JwtModule
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
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
  ]
})
export class AppModule {}
