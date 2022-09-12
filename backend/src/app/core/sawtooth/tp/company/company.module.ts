import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CompanyEntity } from '../../../../../entity/company.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { LoginUserInfoModule } from '../../../../shared/loginUserInfo/login-user-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]), 
    SawtoothUtilityModule,
    LoginUserInfoModule
  ],
  providers: [CompanyService, CompanyRepository],
  controllers: [CompanyController]
})
export class CompanyModule {}
