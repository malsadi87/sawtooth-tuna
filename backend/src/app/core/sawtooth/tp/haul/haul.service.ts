import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { HaulRepository } from './haul.repository';

@Injectable()
export class HaulService {
    private readonly entityName: string;
    constructor(
        private readonly haulRepository: HaulRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'haul';
    }

    async getAll(): Promise<HaulEntity[]> {
        return await this.haulRepository.getAll();
    }

    async getByLaunchDate(launchDateTime: Date): Promise<HaulEntity> {
        return await this.haulRepository.getByLaunchDate(launchDateTime);
    }

    async addNewHaul(haulPayload: HaulCreationDto): Promise<Date> {
        const haul = plainToClass(HaulEntity, haulPayload); 
        const newHaul =  await this.haulRepository.addNewHaul(haul);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newHaul, this.entityName);

        return haul.launchDateTime;
    }
}
