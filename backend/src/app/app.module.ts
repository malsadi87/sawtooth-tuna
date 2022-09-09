import { Module } from '@nestjs/common';
// import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { SawtoothModule } from './core/sawtooth/sawtooth.module';
import { typeOrmConfig } from '../environments/db/typeorm.config';
// import { AuthModule } from './core/auth/auth.module';
import { TripModule } from './core/sawtooth/tp/trip/trip.module';
import { TestModule } from './core/test/test.module';
// import { UsersModule } from './feature/users/users.module';
import { SharedModule } from './shared/shared.module';
// import { ApiExceptionFilter } from './utility/filter/api-exception-filter.filter';
// import { JwtAuthGuard } from './utility/guard/JwtAuth.guard';
// import { RequestPayloadValidationPipe } from './utility/pipe/request-Payload.pipe';
// import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SawtoothModule,
    TestModule,
    SharedModule
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
