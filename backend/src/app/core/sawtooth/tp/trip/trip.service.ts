import { Injectable } from '@nestjs/common';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
    constructor(private tripRepository: TripRepository) 
    { }

    async getAllTrip(): Promise<TripEntity[]> {
        return await this.tripRepository.getAll();
    }
}
