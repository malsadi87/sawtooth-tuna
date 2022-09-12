import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TripEntity } from '../../../../../entity/trip.entity';
import { UserInfo } from '../../../../utility/decorator/user-info.decorator';
import { TripCreationDto } from '../../../../utility/dto/tp/trip-creation.dto';
import { UserInfoDto } from '../../../../utility/dto/user-info.dto';
import { TripService } from './trip.service';

@Controller('sawtooth/tp/trip')
export class TripController {
    constructor(private readonly tripService: TripService){}

    @Get('/:tripNo')
    async getById(@Param('tripNo') tripNo: number): Promise<TripEntity> {
        return await this.tripService.getByTripNo(tripNo);
    }

    @Post('addNew')
    @HttpCode(204)
    async create(@UserInfo() userInfo: UserInfoDto, @Body() tripPayload: TripCreationDto): Promise<number> {
        return await this.tripService.addNewTrip(tripPayload);
    }

    @Get('/')
    async hallo(@UserInfo() userInfo: UserInfoDto): Promise<String> {
        console.log(userInfo);
        return "Hallo boss!";
    }
}
