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

    async getByPalletNumberAndEventTime(palletNumber: string, eventTime: Date): Promise<PalletEventEntity> {
        const result = await this.palletEventRepository.getByPalletNumberAndEventTime(palletNumber, eventTime);
        if (!result)
            throw new NotFoundException('Pallet Event Not Found!');
        return result;
    }

    async getByPalletNumber(palletNumber: string): Promise<PalletEventEntity[]> {
        return await this.palletEventRepository.getByPalletNumber(palletNumber);
    }

    async addNew(newPalletEventPayload: PalletEventCreationDto): Promise<{ palletNum: string, eventTime: Date }> {
        try {
            const palletEvent = plainToClass(PalletEventEntity, newPalletEventPayload);
            const pallet = await this.palletService.getByPalletNo(palletEvent.palletNum);
    
            const oldPalletEvent = await this.palletEventRepository.getByPalletNumberAndEventTime(palletEvent.palletNum, palletEvent.eventTime);
            if (oldPalletEvent) throw new BadRequestException(`Pallet Event with Number - ${palletEvent.palletNum} And Event Time ${palletEvent.eventTime}, Already Exist!`);
    
            const newPalletEvent = await this.palletEventRepository.addNew(palletEvent);
    
            // Save in Sawtooth
            await this.sawtoothUtilityService.createAsset(newPalletEvent, this.entityName);
    
            return { palletNum: newPalletEvent.palletNum, eventTime: newPalletEvent.eventTime };
        } catch(e) {
            if (e instanceof NotFoundException)
                throw new BadRequestException(`A Pallet has to created first before adding Pallet Event!`);
            throw e;
        }
    }

    async verifyData(palletNumber: string, eventTime: Date): Promise<boolean> {
        /**
         * Get the whole entity from DB
         * As, Entity cound change between time, by another client
         * And, getting the whole entity from Frontend, is not safe
         */
         const result = await this.palletEventRepository.getByPalletNumberAndEventTime(palletNumber, eventTime);
        if (!result) throw new NotFoundException(`Pallet With Number - ${palletNumber} And Time - ${eventTime} Not Found!`);

        return this.sawtoothUtilityService.verifyAsset(result, this.entityName);
    }
}
