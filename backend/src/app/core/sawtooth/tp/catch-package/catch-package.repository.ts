import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';

@Injectable()
export class CatchPackageRepository extends Repository<CatchPackageEntity> {
    constructor(private dataSource: DataSource) {
        super(CatchPackageEntity, dataSource.createEntityManager());
    }

    
}
