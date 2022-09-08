import { EntityRepository, Repository } from 'typeorm';
import { TripEntity } from '../../../../../entity/trip.entity';

@EntityRepository(TripEntity)
export class TripRepository extends Repository<TripEntity> {
    async getAll(): Promise<TripEntity[]> {
        const result = await this.getAll();
        return result;
    }
}
