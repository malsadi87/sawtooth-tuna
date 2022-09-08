import { Controller, Get } from '@nestjs/common';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripService } from './trip.service';

@Controller('sawtooth/trip')
export class TripController {
    constructor(private tripService: TripService){}

    @Get('/get')
    async CreateKeyPair(): Promise<TripEntity[]> {
        return await this.tripService.getAllTrip();
    }
}
