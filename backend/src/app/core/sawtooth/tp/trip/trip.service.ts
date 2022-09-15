import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TripEntity } from '../../../../../entity/trip.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { TripCreationDto } from '../../../../utility/dto/tp/trip-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
    private readonly familyName: string;
    constructor(
        private readonly tripRepository: TripRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) { 
        this.familyName = 'trip';
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
        
        // Get the userInfo
        const userInfo = this.loginUserInfoService.getInfo();   

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newTrip, userInfo.blockChainPrivateKey, this.familyName);

        return newTrip.tripNo;
    }

    public testMe(): string {
        const userInfo = this.loginUserInfoService.getInfo();
        console.log(userInfo);
        return "Hallo boss!";
    }
}
