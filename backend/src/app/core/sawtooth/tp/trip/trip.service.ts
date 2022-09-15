import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripCreationDto } from '../../../../utility/dto/tp/trip-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
    private readonly entityName: string;
    constructor(
        private readonly tripRepository: TripRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) { 
        this.entityName = 'trip';
    }

    async getAllTrip(): Promise<TripEntity[]> {
        return await this.tripRepository.getAll();
    }

    async getByTripNo(tripNo: number): Promise<TripEntity> {
        return await this.tripRepository.getByTripNo(tripNo);
    }

    async addNewTrip(tripPayload: TripCreationDto): Promise<number> {
        let trip: TripEntity = plainToClass(TripEntity, tripPayload);
        const newTrip = await this.tripRepository.addNewTrip(trip);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newTrip, this.entityName, newTrip.tripNo);

        return newTrip.tripNo;
    }

    public testMe(): string {
        return "Hallo boss!";
    }
}
