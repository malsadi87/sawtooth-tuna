import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getByHaulId(haulId: number): Promise<HaulEntity> {
        const result = await this.haulRepository.getByHaulId(haulId);
        if (!result)
            throw new NotFoundException('Haul Not Foun!');
        return result;
    }

    async addNewHaul(haulPayload: HaulCreationDto): Promise<Date> {
        const haul = plainToClass(HaulEntity, haulPayload);
        const oldHaul = await this.haulRepository.getByHaulId(haul.haulId);

        if (oldHaul) throw new BadRequestException(`Haul with Id - ${haul.haulId}, Already Exist!`);

        const newHaul =  await this.haulRepository.addNewHaul(haul);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newHaul, this.entityName);

        return haul.launchDateTime;
    }
}
