import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';

@Controller('sawtooth/tp/species')
export class SpeciesAndWeightController {

    @Get(':id')
    async getById(@Param('id') id: number): Promise<SpeciesAndWeightEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
