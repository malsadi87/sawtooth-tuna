import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { HaulRepository } from './haul.repository';

@Injectable()
export class HaulService {
    private readonly familyName;
    constructor(
        private readonly haulRepository: HaulRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = '';
    }

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
