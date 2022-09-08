import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './company.repository';

@Module({
  providers: [CompanyService, Company],
  controllers: [CompanyController]
})
export class CompanyModule {}
