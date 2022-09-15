import { Module } from '@nestjs/common';
import { CatchPackageService } from './catch-package.service';
import { CatchPackageController } from './catch-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchPackageRepository } from './catch-package.repository';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatchPackageEntity]), 
    SawtoothUtilityModule
  ],
  providers: [CatchPackageService, CatchPackageRepository],
  controllers: [CatchPackageController]
})
export class CatchPackageModule {}
