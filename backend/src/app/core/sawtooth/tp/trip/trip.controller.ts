import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripService } from './trip.service';

@Controller('sawtooth/tp/trip')
export class TripController {
    constructor(private tripService: TripService){}

    @Get('/:id')
    async getById(): Promise<TripEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }

    @Get('/')
    async hallo(): Promise<String> {
        return "Hallo boss!";
    }
}
