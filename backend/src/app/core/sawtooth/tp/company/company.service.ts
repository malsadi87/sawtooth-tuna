import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CompanyEntity } from '../../../../../entity/company.entity';
import { CompanyCreationDto } from '../../../../utility/dto/tp/company-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
    private readonly entityName: string;
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'company';
    }

    async getAll(): Promise<CompanyEntity[]> {
        return await this.companyRepository.getAll();
    }

    async getById(id: number): Promise<CompanyEntity> {
        const result = await this.companyRepository.getById(id);
        if (!result)
            throw new NotFoundException('Company Not Found!');
        return result;
    }

    async addNewCompany(newCompanyPayload: CompanyCreationDto): Promise<number> {
        const company = plainToClass(CompanyEntity, newCompanyPayload);
        const oldCompany =  await this.companyRepository.getByName(company.companyName);

        if (oldCompany) throw new BadRequestException(`Company with name - "${company.companyName}" already exist!`);

        const newCompany =  await this.companyRepository.addNewCompany(company);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newCompany, this.entityName);

        return newCompany.companyId;
    }
}
