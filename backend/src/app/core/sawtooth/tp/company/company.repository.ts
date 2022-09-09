import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CompanyEntity } from '../../../../../entity/company.entity';

@Injectable()
export class CompanyRepository extends Repository<CompanyEntity> {
    constructor(private dataSource: DataSource) {
        super(CompanyEntity, dataSource.createEntityManager());
    }

    
}
