import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { SpeciesCreationDto } from '../../../../utility/dto/tp/species-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { SpeciesAndWeightRepository } from './species-and-weight.repository';

@Injectable()
export class SpeciesAndWeightService {
    private readonly familyName: string;
    constructor(
        private speciesAndWeightRepository: SpeciesAndWeightRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = 'species';
    }

    async getAllSpecies(): Promise<SpeciesAndWeightEntity[]> {
        return await this.speciesAndWeightRepository.getAll();
    }

    async getById(id: number): Promise<SpeciesAndWeightEntity> {
        return await this.speciesAndWeightRepository.getById(id);
    }

    async addNew(speciesPayload: SpeciesCreationDto): Promise<number> {
        const species: SpeciesAndWeightEntity = plainToClass(SpeciesAndWeightEntity, speciesPayload);
        const newSpecies = await this.speciesAndWeightRepository.addNew(species);

        // Get the userInfo
        const userInfo = this.loginUserInfoService.getInfo();

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newSpecies, userInfo.blockChainPrivateKey, this.familyName);

        return newSpecies.speciesId;
    }
}
