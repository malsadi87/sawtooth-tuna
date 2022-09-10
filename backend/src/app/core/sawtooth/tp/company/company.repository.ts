import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CompanyEntity } from '../../../../../entity/company.entity';

@Injectable()
export class CompanyRepository extends Repository<CompanyEntity> {
    constructor(private dataSource: DataSource) {
        super(CompanyEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<CompanyEntity[]> {
        const result = await this.find();
        return result;
    }

    async getById(id: number): Promise<CompanyEntity> {
        return await this.findOneBy({ companyId: id});
    }

    async addNewCompany(newCompany: CompanyEntity): Promise<number> {
        await newCompany.save();
        return newCompany.companyId;
    }
}
