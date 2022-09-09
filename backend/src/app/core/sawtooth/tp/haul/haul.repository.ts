import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { HaulEntity } from '../../../../../entity/haul.entity';

@Injectable()
export class HaulRepository extends Repository<HaulEntity> {
    constructor(private dataSource: DataSource) {
        super(HaulEntity, dataSource.createEntityManager());
    }

    
}
