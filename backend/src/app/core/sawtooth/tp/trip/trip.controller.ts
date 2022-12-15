import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripCreationDto } from '../../../../utility/dto/tp/trip-creation.dto';
import { TripService } from './trip.service';

@Controller('sawtooth/tp/trip')
export class TripController {
    constructor(private readonly tripService: TripService){}

    @Get('/:pkTrip')
    async getById(@Param('pkTrip') pkTrip: number): Promise<TripEntity> {
        return await this.tripService.getByPkTrip(pkTrip);
    }

    @Post('addNew')
    async create(@Body() tripPayload: TripCreationDto): Promise<number> {
        return await this.tripService.addNewTrip(tripPayload);
    }

    @Get('/')
    async getAll(): Promise<TripEntity[]> {
        return this.tripService.getAllTrip();
    }
}
