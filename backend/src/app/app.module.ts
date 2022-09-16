import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { typeOrmConfig } from '../environments/db/typeorm.config';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { CoreModule } from './core/core.module';
import { UtilityModule } from './utility/utility.module';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE, ModulesContainer, Reflector } from '@nestjs/core';
import { ApiExceptionFilter } from './utility/filter/api-exception-filter.filter';
import { JwtAuthGuard } from './utility/guard/JwtAuth.guard';
import { RequestPayloadValidationPipe } from './utility/pipe/request-Payload.pipe';
import { DataSource } from 'typeorm';
import { IS_SUBSCRIBER } from './utility/decorator/entitySubscriber.decorator';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CoreModule,
    SharedModule,
    FeatureModule,
    UtilityModule,
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
export class AppModule implements OnModuleInit {
  constructor(
    private readonly dataSource: DataSource,
    private readonly container: ModulesContainer,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    // find providers marked as entity subscribers...
    // const subscribers = [...this.container.values()]
    // .filter(({ providers }) => providers.size > 0)
    // .reduce(
    //   (matching, { providers }) => [
    //     ...matching,
    //     ...[...providers.values()]
    //       .filter(
    //         provider =>
    //           provider.instance &&
    //           this.reflector.get(
    //             IS_SUBSCRIBER,
    //             provider.instance.constructor,
    //           ) === true,
    //       )
    //       .map(provider => provider.instance),
    //   ],
    //   [],
    // );

    // // ...and hand those instances over to typeorm
    // subscribers.forEach(subscriber => {
    //   console.log(subscriber);
    //   this.dataSource.subscribers.push(subscriber);
    // }); 
  }
}
