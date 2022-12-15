import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { SpeciesEntity } from '../../../../../entity/species.entity';
import { SpeciesCreationDto } from '../../../../utility/dto/tp/species-creation.dto';
import { SpeciesService } from './species.service';

@Controller('sawtooth/tp/species')
export class SpeciesController {
    constructor(private readonly SpeciesService: SpeciesService){}

    @Get(':id')
    async getById(@Param('id') id: number): Promise<SpeciesEntity> {
        return await this.SpeciesService.getById(id);
    }

    @Post('addNew')
    async create(@Body() speciesPayload: SpeciesCreationDto): Promise<number> {
        return await this.SpeciesService.addNew(speciesPayload);
    }

    @Get('/')
    async getAll(): Promise<SpeciesEntity[]> {
        return this.SpeciesService.getAllSpecies();
    }
}
