import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';

@Injectable()
export class SpeciesAndWeightRepository extends Repository<SpeciesAndWeightEntity> {
    constructor(private dataSource: DataSource) {
        super(SpeciesAndWeightEntity, dataSource.createEntityManager());
    }

    
}
