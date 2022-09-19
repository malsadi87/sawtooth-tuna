import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { HaulCreationDto } from '../../../../utility/dto/tp/haul-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { HaulRepository } from './haul.repository';

@Injectable()
export class HaulService {
    private readonly familyName: string;
    constructor(
        private readonly haulRepository: HaulRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = 'haul';
    }

    async getAll(): Promise<HaulEntity[]> {
        return await this.haulRepository.getAll();
    }

    async getByLaunchDate(launchDateTime: Date): Promise<HaulEntity> {
        return await this.haulRepository.getByLaunchDate(launchDateTime);
    }

    async addNewHaul(haulPayload: HaulCreationDto): Promise<Date> {
        Logger.log('HAUL')
        Logger.log(JSON.stringify(haulPayload))
        const haul = plainToClass(HaulEntity, haulPayload);
        const newHaul =  await this.haulRepository.addNewHaul(haul);

        // Get the userInfo
        const userInfo = this.loginUserInfoService.getInfo();

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newHaul, userInfo.blockChainPrivateKey, this.familyName);

        return newHaul.launchDateTime;
    }
}
