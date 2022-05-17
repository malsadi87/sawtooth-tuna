import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [CoreModule, FeatureModule, UtilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
