import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { HaulService } from './haul.service';

@Controller('sawtooth/tp/haul')
export class HaulController {
    constructor(private readonly haulService: HaulService) {}

    @Get(':launchDateTime')
    async getByLaunchDateTime(@Param('launchDateTime') launchDateTime: Date): Promise<HaulEntity> {
        return await this.haulService.getByLaunchDate(launchDateTime);
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
