import { Module } from '@nestjs/common';
import { CatchPackageService } from './catch-package.service';
import { CatchPackageController } from './catch-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchPackageRepository } from './catch-package.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CatchPackageRepository])],
  providers: [CatchPackageService],
  controllers: [CatchPackageController]
})
export class CatchPackageModule {}
