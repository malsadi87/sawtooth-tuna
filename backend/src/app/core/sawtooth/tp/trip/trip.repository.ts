import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { TripEntity } from '../../../../../entity/trip.entity';

@Injectable()
export class TripRepository extends Repository<TripEntity> {
    constructor(private dataSource: DataSource) {
        super(TripEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<TripEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByPkTrip(pkTrip: number): Promise<TripEntity> {
        return await this.findOneBy({ pkTrip: pkTrip });
    }

    async addNewTrip(newTrip: TripEntity): Promise<TripEntity> {
        return await newTrip.save();
    }
}
