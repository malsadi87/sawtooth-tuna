import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';

@Injectable()
export class CustomLevelPackageRepository extends Repository<CustomLevelPackageEntity> {
    constructor(private dataSource: DataSource) {
        super(CustomLevelPackageEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<CustomLevelPackageEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByConsumerPackageId(consumerPackageId: string): Promise<CustomLevelPackageEntity> {
        return await this.findOneBy({ consumerPackageId: consumerPackageId });
    }

    async addNewPackage(customPackage: CustomLevelPackageEntity): Promise<CustomLevelPackageEntity> {
        return await customPackage.save();
    }
}
