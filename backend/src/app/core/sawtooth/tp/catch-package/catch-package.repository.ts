import { EntityRepository, Repository } from 'typeorm';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';

@EntityRepository(CatchPackageEntity)
export class CatchPackageRepository extends Repository<CatchPackageEntity> {
    
}
