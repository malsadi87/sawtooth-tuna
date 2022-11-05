import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripCreationDto } from '../../../../utility/dto/tp/trip-creation.dto';
import { TripService } from './trip.service';

@Controller('sawtooth/tp/trip')
export class TripController {
    constructor(private readonly tripService: TripService){}

    @Get('/:tripNo')
    async getById(@Param('tripNo') tripNo: number): Promise<TripEntity> {
        return await this.tripService.getByTripNo(tripNo);
    }

    @Post('addNew')
    async create(@Body() tripPayload: TripCreationDto): Promise<number> {
        return await this.tripService.addNewTrip(tripPayload);
    }

    @Get('verify/:tripNo')
    async verify(@Param('tripNo') tripNo: number): Promise<boolean> {
        return await this.tripService.verifyData(tripNo);
    }

    @Get('/')
    async getAll(): Promise<TripEntity[]> {
        return this.tripService.getAllTrip();
    }
}
