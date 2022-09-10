import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CompanyEntity } from '../../../../../entity/company.entity';
import { CompanyCreationDto } from '../../../../utility/dto/tp/company-creation.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
    constructor(private readonly companyRepository: CompanyRepository) {}

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
