import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CatchEntity } from '../../../../../entity/catch.entity';

@Injectable()
export class CatchRepository extends Repository<CatchEntity> {
    constructor(private dataSource: DataSource) {
        super(CatchEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<CatchEntity[]> {
        const result = await this.find();
        return result;
    }

    async getById(id: number): Promise<CatchEntity> {
        return await this.findOneBy({ pkCatch: id });
    }

    async addNewCatch(catchObject: CatchEntity): Promise<CatchEntity> {
        return await catchObject.save();
    }
}
