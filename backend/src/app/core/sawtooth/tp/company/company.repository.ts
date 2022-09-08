import { EntityRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../../../../../entity/company.entity';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
    
}
