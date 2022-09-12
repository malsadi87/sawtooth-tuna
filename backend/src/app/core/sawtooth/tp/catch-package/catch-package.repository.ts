import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';

@Injectable()
export class CatchPackageRepository extends Repository<CatchPackageEntity> {
    constructor(private dataSource: DataSource) {
        super(CatchPackageEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<CatchPackageEntity[]> {
        const result = await this.find();
        return result;
    }

    async getById(id: string): Promise<CatchPackageEntity> {
        return await this.findOneBy({ catchPackageId: id });
    }

    async addNewCatchPackage(catchPackage: CatchPackageEntity): Promise<CatchPackageEntity> {
        return await catchPackage.save();
    }
}
