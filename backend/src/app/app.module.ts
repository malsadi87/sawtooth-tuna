import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { ApiExceptionFilter } from './utility/filter/api-exception-filter.filter';
import { RequestPayloadValidationPipe } from './utility/pipe/request-Payload.pipe';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [CoreModule, FeatureModule, UtilityModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: RequestPayloadValidationPipe
    }
  ]
})
export class AppModule {}
