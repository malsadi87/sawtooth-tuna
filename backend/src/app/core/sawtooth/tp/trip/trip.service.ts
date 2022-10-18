import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        const result = await this.tripRepository.getByTripNo(tripNo);
        if (!result)
            throw new NotFoundException('Trip not Found!');
        return result;
    }

    async addNewTrip(tripPayload: TripCreationDto): Promise<number> {
        const trip: TripEntity = plainToClass(TripEntity, tripPayload);
        const oldTrip = await this.tripRepository.getByTripNo(trip.tripNo);

        if (oldTrip) throw new BadRequestException(`Trip with No - ${trip.tripNo}, Already Exist!`);

        const newTrip = await this.tripRepository.addNewTrip(trip);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newTrip, this.entityName); 

        return newTrip.tripNo;
    }

    public testMe(): string {
        return "Hallo boss!";
    }
}
