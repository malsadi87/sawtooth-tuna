import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';

@Injectable()
export class CustomLevelPackageRepository extends Repository<CustomLevelPackageEntity> {
    constructor(private dataSource: DataSource) {
        super(CustomLevelPackageEntity, dataSource.createEntityManager());
    }

    
}
