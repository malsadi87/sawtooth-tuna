import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { HaulService } from './haul.service';

@Controller('sawtooth/tp/haul')
export class HaulController {
    constructor(private readonly haulService: HaulService) {}

    @Get(':pkHaul')
    async getByPkHaul(@Param('pkHaul') pkHaul: number): Promise<HaulEntity> {
        return await this.haulService.getByPkHaul(pkHaul);
    }

    @Get('trip/:pkTrip')
    async getByPkTrip(@Param('pkTrip') pkTrip: number): Promise<HaulEntity[]> {
        return await this.haulService.getByPkTrip(pkTrip);
    }

    @Post('addNew')
    async create(@Body() haulPayload: HaulCreationDto): Promise<Date> {
        return await this.haulService.addNewHaul(haulPayload);
    }

    @Get('/')
    async getAll(): Promise<HaulEntity[]> {
        return this.haulService.getAll();
    }
}
