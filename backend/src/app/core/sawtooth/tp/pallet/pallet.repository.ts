import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PalletEntity } from '../../../../../entity/pallet.entity';

@Injectable()
export class PalletRepository extends Repository<PalletEntity> {
    constructor(private dataSource: DataSource) {
        super(PalletEntity, dataSource.createEntityManager());
    }

    
}
