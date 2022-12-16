import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SpeciesEntity } from '../../../../../entity/species.entity';
import { SpeciesCreationDto } from '../../../../utility/dto/tp/species-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { SpeciesRepository } from './species.repository';

@Injectable()
export class SpeciesService {
    private readonly entityName: string;
    constructor(
        private SpeciesRepository: SpeciesRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'species';
    }

    async getAllSpecies(): Promise<SpeciesEntity[]> {
        return await this.SpeciesRepository.getAll();
    }

    async getById(id: number): Promise<SpeciesEntity> {
        const result = await this.SpeciesRepository.getById(id);
        if (!result)
            throw new NotFoundException(`Species And Quantity Not Found!`);
        return result;
    }

    async addNew(speciesPayload: SpeciesCreationDto): Promise<number> {
        const species: SpeciesEntity = plainToClass(SpeciesEntity, speciesPayload);
        const newSpecies = await this.SpeciesRepository.addNew(species);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newSpecies, this.entityName);

        return newSpecies.pkSpecies;
    }
}
