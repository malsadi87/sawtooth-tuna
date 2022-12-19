import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ConsumerPackageEntity } from '../../../../../entity/consumerPackage.entity';

@Injectable()
export class CustomLevelPackageRepository extends Repository<ConsumerPackageEntity> {
    constructor(private dataSource: DataSource) {
        super(ConsumerPackageEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<ConsumerPackageEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByPkConsumerPackage(pkConsumerPackage: number): Promise<ConsumerPackageEntity> {
        return await this.findOneBy({ pkConsumerPackage: pkConsumerPackage });
    }

    async addNewPackage(consumerPackage: ConsumerPackageEntity): Promise<ConsumerPackageEntity> {
        return await consumerPackage.save();
    }
}
