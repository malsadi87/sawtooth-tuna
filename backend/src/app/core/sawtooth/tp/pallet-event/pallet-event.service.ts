import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { PalletEventCreationDto } from '../../../../utility/dto/tp/pallet-event-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletEventRepository } from './pallet-event.repository';

@Injectable()
export class PalletEventService {
    private readonly familyName: string;
    constructor(
        private palletEventRepository: PalletEventRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = 'pallet-event';
    }

    async getAll(): Promise<PalletEventEntity[]> {
        return await this.palletEventRepository.getAll();
    }

    async getByPalletNumberAndEventTime(palletNumber: string, eventTime: Date): Promise<PalletEventEntity> {
        return await this.palletEventRepository.getByPalletNumberAndEventTime(palletNumber, eventTime);
    }

    async getByPalletNumber(palletNumber: string): Promise<PalletEventEntity[]> {
        return await this.palletEventRepository.getByPalletNumber(palletNumber);
    }

    async addNew(newPalletEventPayload: PalletEventCreationDto): Promise<{ palletNum: string, eventTime: Date }> {
        const palletEvent = plainToClass(PalletEventEntity, newPalletEventPayload);
        const newPalletEvent = await this.palletEventRepository.addNew(palletEvent);

        // Get the userInfo
        const userInfo = this.loginUserInfoService.getInfo();

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newPalletEvent, userInfo.blockChainPrivateKey, this.familyName);

        return { palletNum: newPalletEvent.palletNum, eventTime: newPalletEvent.eventTime };
    }
}
