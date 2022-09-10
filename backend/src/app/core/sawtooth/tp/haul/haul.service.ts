import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { HaulRepository } from './haul.repository';

@Injectable()
export class HaulService {
    constructor(private readonly haulRepository: HaulRepository) {}

    async getAll(): Promise<HaulEntity[]> {
        return await this.haulRepository.getAll();
    }

    async getByLaunchDate(launchDateTime: Date): Promise<HaulEntity> {
        return await this.haulRepository.getByLaunchDate(launchDateTime);
    }

    async addNewHaul(haulPayload: HaulCreationDto): Promise<Boolean> {
        const haul = plainToClass(HaulEntity, haulPayload);
        return await this.haulRepository.addNewHaul(haul);
    }
}
