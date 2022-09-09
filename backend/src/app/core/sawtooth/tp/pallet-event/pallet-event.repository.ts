import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';

@Injectable()
export class PalletEventRepository extends Repository<PalletEventEntity> {
    constructor(private dataSource: DataSource) {
        super(PalletEventEntity, dataSource.createEntityManager());
    }

    
}
