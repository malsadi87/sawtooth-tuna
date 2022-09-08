import { EntityRepository, Repository } from 'typeorm';
import { HaulEntity } from '../../../../../entity/haul.entity';

@EntityRepository(HaulEntity)
export class HaulRepository extends Repository<HaulEntity> {
    
}
