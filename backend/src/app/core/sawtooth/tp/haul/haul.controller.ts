import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { HaulEntity } from '../../../../../entity/haul.entity';

@Controller('sawtooth/haul')
export class HaulController {

    @Get(':id')
    async getById(@Param('id') id: number): Promise<HaulEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
