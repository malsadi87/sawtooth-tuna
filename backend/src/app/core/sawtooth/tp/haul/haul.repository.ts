import { Injectable, Logger } from '@nestjs/common';
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

    async getByLaunchDate(launchDateTime: Date): Promise<HaulEntity> {
        return await this.findOneBy({ launchDateTime: launchDateTime });
    }

    async addNewHaul(newHaul: HaulEntity): Promise<HaulEntity> {
        Logger.log('Save to db')
        Logger.log(JSON.stringify(newHaul))
        return await newHaul.save();
    }
}
