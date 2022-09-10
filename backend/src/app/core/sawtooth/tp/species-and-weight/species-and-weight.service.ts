import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';
import { SpeciesCreationDto } from '../../../../utility/dto/tp/species-creation.dto';
import { SpeciesAndWeightRepository } from './species-and-weight.repository';

@Injectable()
export class SpeciesAndWeightService {
    constructor(private speciesAndWeightRepository: SpeciesAndWeightRepository)
    { }

    async getAllSpecies(): Promise<SpeciesAndWeightEntity[]> {
        return await this.speciesAndWeightRepository.getAll();
    }

    async getById(id: number): Promise<SpeciesAndWeightEntity> {
        return await this.speciesAndWeightRepository.getById(id);
    }

    async addNew(speciesPayload: SpeciesCreationDto): Promise<number> {
        let trip: SpeciesAndWeightEntity = plainToClass(SpeciesAndWeightEntity, speciesPayload);
        return await this.speciesAndWeightRepository.addNew(trip);
    }
}
