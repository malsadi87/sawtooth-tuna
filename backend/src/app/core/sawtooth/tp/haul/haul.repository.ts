import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { HaulEntity } from '../../../../../entity/haul.entity';

@Injectable()
export class HaulRepository extends Repository<HaulEntity> {
    constructor(private dataSource: DataSource) {
        super(HaulEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<HaulEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByHaulId(haulId: number): Promise<HaulEntity> {
        return await this.findOneBy({ haulId: haulId });
    }

    async addNewHaul(newHaul: HaulEntity): Promise<HaulEntity> {
        return await newHaul.save();
    }
}
