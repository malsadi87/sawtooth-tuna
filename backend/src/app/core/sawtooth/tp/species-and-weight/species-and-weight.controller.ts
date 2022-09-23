import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';
import { SpeciesCreationDto } from '../../../../utility/dto/tp/species-creation.dto';
import { SpeciesAndWeightService } from './species-and-weight.service';

@Controller('sawtooth/tp/species')
export class SpeciesAndWeightController {
    constructor(private readonly speciesAndWeightService: SpeciesAndWeightService){}

    @Get(':id')
    async getById(@Param('id') id: number): Promise<SpeciesAndWeightEntity> {
        return await this.speciesAndWeightService.getById(id);
    }

    @Post('addNew')
    async create(@Body() speciesPayload: SpeciesCreationDto): Promise<number> {
        return await this.speciesAndWeightService.addNew(speciesPayload);
    }

    @Get('/')
    async getAll(): Promise<SpeciesAndWeightEntity[]> {
        return this.speciesAndWeightService.getAllSpecies();
    }
}
