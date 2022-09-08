import { Module } from '@nestjs/common';
import { CustomLevelPackageService } from './custom-level-package.service';
import { CustomLevelPackageController } from './custom-level-package.controller';
import { CustomLevelPackage } from './custom-level-package.repository';

@Module({
  providers: [CustomLevelPackageService, CustomLevelPackage],
  controllers: [CustomLevelPackageController]
})
export class CustomLevelPackageModule {}
