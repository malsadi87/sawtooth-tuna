import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';
import { SpeciesCreationDto } from '../../../../utility/dto/tp/species-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { SpeciesAndWeightRepository } from './species-and-weight.repository';

@Injectable()
export class SpeciesAndWeightService {
    private readonly entityName: string;
    constructor(
        private speciesAndWeightRepository: SpeciesAndWeightRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'species';
    }

    async getAllSpecies(): Promise<SpeciesAndWeightEntity[]> {
        return await this.speciesAndWeightRepository.getAll();
    }

    async getById(id: number): Promise<SpeciesAndWeightEntity> {
        const result = await this.speciesAndWeightRepository.getById(id);
        if (!result)
            throw new NotFoundException(`Species And Weight Not Found!`);
        return result;
    }

    async getByCatchPackageId(id: string): Promise<SpeciesAndWeightEntity[]> {
      return await this.speciesAndWeightRepository.getByCatchPackageId(id);
    }

    async addNew(speciesPayload: SpeciesCreationDto): Promise<number> {
        const species: SpeciesAndWeightEntity = plainToClass(SpeciesAndWeightEntity, speciesPayload);
        const oldSpecies = await this.speciesAndWeightRepository.getByDetails(species.quantity, species.species, species.catchPackageId, species.launchDateTime);

        if (oldSpecies) throw new BadRequestException(`Specied and Weight Already Exist!`);

        const newSpecies = await this.speciesAndWeightRepository.addNew(species);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newSpecies, this.entityName);

        return newSpecies.speciesId;
    }
}
