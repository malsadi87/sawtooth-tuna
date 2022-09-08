import { EntityRepository, Repository } from 'typeorm';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';

@EntityRepository(SpeciesAndWeightEntity)
export class SpeciesAndWeightRepository extends Repository<SpeciesAndWeightEntity> {
    
}
