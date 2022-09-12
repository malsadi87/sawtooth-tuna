import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CompanyEntity } from '../../../../../entity/company.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { CompanyCreationDto } from '../../../../utility/dto/tp/company-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
    private readonly familyName;
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = '';
    }

    async getAll(): Promise<CompanyEntity[]> {
        return await this.companyRepository.getAll();
    }

    async getById(id: number): Promise<CompanyEntity> {
        return await this.companyRepository.getById(id);
    }

    async addNewCompany(newCompanyPayload: CompanyCreationDto): Promise<number> {
        const company = plainToClass(CompanyEntity, newCompanyPayload);
        return await this.companyRepository.addNewCompany(company);
    }
}
