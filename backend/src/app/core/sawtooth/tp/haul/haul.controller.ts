import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { HaulService } from './haul.service';

@Controller('sawtooth/tp/haul')
export class HaulController {
    constructor(private readonly haulService: HaulService) {}

    @Get(':haulId')
    async getByHaulId(@Param('haulId') haulId: number): Promise<HaulEntity> {
        return await this.haulService.getByHaulId(haulId);
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
