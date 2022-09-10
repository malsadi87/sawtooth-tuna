import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripCreationDto } from '../../../../utility/dto/tp/trip-creation.dto';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
    constructor(private tripRepository: TripRepository) 
    { }

    async getAllTrip(): Promise<TripEntity[]> {
        return await this.tripRepository.getAll();
    }

    async getByTripNo(tripNo: number): Promise<TripEntity> {
        return await this.tripRepository.getByTripNo(tripNo);
    }

    async addNewTrip(tripPayload: TripCreationDto): Promise<number> {
        let trip: TripEntity = plainToClass(TripEntity, tripPayload);
        return await this.tripRepository.addNewTrip(trip);
    }
}
