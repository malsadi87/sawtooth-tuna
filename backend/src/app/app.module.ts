import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { typeOrmConfig } from '../environments/db/typeorm.config';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { UtilityModule } from './utility/utility.module';
import { CoreModule } from './core/core.module';
// import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
// import { ApiExceptionFilter } from './utility/filter/api-exception-filter.filter';
// import { JwtAuthGuard } from './utility/guard/JwtAuth.guard';
// import { RequestPayloadValidationPipe } from './utility/pipe/request-Payload.pipe';
// import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CoreModule,
    SharedModule,
    FeatureModule,
    UtilityModule
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: ApiExceptionFilter
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: RequestPayloadValidationPipe
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ]
})
export class AppModule {}
