import { Module } from '@nestjs/common';
import { CatchPackageService } from './catch-package.service';
import { CatchPackageController } from './catch-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchPackageRepository } from './catch-package.repository';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { PalletModule } from '../pallet/pallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatchPackageEntity]), 
    SawtoothUtilityModule,
    PalletModule
  ],
  providers: [CatchPackageService, CatchPackageRepository],
  exports: [CatchPackageService],
  controllers: [CatchPackageController]
})
export class CatchPackageModule {}
