import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLevelPackageService } from './custom-level-package.service';
import { CustomLevelPackageController } from './custom-level-package.controller';
import { CustomLevelPackageRepository } from './custom-level-package.repository';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomLevelPackageEntity]), SawtoothUtilityModule],
  providers: [CustomLevelPackageService, CustomLevelPackageRepository],
  controllers: [CustomLevelPackageController]
})
export class CustomLevelPackageModule {}
