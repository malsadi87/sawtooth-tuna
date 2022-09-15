import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { PalletEventCreationDto } from '../../../../utility/dto/tp/pallet-event-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletEventRepository } from './pallet-event.repository';

@Injectable()
export class PalletEventService {
    private readonly entityName: string;
    constructor(
        private palletEventRepository: PalletEventRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'pallet-event';
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

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newPalletEvent, this.entityName, `${newPalletEvent.palletNum}${newPalletEvent.eventTime.toString()}`);

        return { palletNum: newPalletEvent.palletNum, eventTime: newPalletEvent.eventTime };
    }
}
