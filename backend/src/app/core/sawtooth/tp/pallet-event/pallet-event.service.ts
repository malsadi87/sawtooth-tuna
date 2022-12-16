import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { PalletEventCreationDto } from '../../../../utility/dto/tp/pallet-event-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletService } from '../pallet/pallet.service';
import { PalletEventRepository } from './pallet-event.repository';

@Injectable()
export class PalletEventService {
    private readonly entityName: string;
    constructor(
        private readonly palletEventRepository: PalletEventRepository,
        private readonly palletService: PalletService,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'pallet-event';
    }

    async getAll(): Promise<PalletEventEntity[]> {
        return await this.palletEventRepository.getAll();
    }

    async getByPkPalletAndEventDateTime(pkPallet: number, eventTime: Date): Promise<PalletEventEntity> {
        const result = await this.palletEventRepository.getByPkPalletAndEventDateTime(pkPallet, eventTime);
        if (!result)
            throw new NotFoundException('Pallet Event Not Found!');
        return result;
    }

    async getByPkPallet(pkPallet: number): Promise<PalletEventEntity[]> {
        return await this.palletEventRepository.getByPkPallet(pkPallet);
    }

    async addNew(newPalletEventPayload: PalletEventCreationDto): Promise<{ pkPalletEvent: number, eventTime: Date }> {
        try {
            const palletEvent = plainToClass(PalletEventEntity, newPalletEventPayload);
            const newPalletEvent = await this.palletEventRepository.addNew(palletEvent);
    
            // Save in Sawtooth
            await this.sawtoothUtilityService.createAsset(newPalletEvent, this.entityName);
    
            return { pkPalletEvent: newPalletEvent.pkPalletEvent, eventTime: newPalletEvent.eventTime };
        } catch(e) {
            if (e instanceof NotFoundException)
                throw new BadRequestException(`A Pallet has to created first before adding Pallet Event!`);
            throw e;
        }
    }
}
