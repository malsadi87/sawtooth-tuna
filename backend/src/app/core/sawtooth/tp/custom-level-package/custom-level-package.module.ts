import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLevelPackageService } from './custom-level-package.service';
import { CustomLevelPackageController } from './custom-level-package.controller';
import { CustomLevelPackageRepository } from './custom-level-package.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomLevelPackageRepository])],
  providers: [CustomLevelPackageService],
  controllers: [CustomLevelPackageController]
})
export class CustomLevelPackageModule {}
