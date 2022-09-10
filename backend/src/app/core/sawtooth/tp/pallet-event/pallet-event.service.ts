import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { PalletEventCreationDto } from '../../../../utility/dto/tp/pallet-event-creation.dto';
import { PalletEventRepository } from './pallet-event.repository';

@Injectable()
export class PalletEventService {
    constructor(private palletEventRepository: PalletEventRepository)
    { }

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
        return await this.palletEventRepository.addNew(palletEvent);
    }
}
