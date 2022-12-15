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
        return await this.findOneBy({ pkCompany: id});
    }

    async getByName(name: string): Promise<CompanyEntity> {
        return await this.findOneBy({ companyName: name });
    }

    async addNewCompany(newCompany: CompanyEntity): Promise<CompanyEntity> {
        return await newCompany.save();
    }
}
