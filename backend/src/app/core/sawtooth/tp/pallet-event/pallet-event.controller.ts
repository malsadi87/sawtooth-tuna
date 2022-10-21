import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { PalletEventCreationDto } from '../../../../utility/dto/tp/pallet-event-creation.dto';
import { PalletEventService } from './pallet-event.service';

@Controller('sawtooth/tp/pallet-event')
export class PalletEventController {
    constructor(private readonly palletEventService: PalletEventService) {}
    
    @Get(':palletNumber/:eventTime')
    async getByPalletNumberAndEventTime(@Param('palletNumber') palletNumber: string, @Param('eventTime') eventTime: Date): Promise<PalletEventEntity> {
        return await this.palletEventService.getByPalletNumberAndEventTime(palletNumber, eventTime);
    }

    @Get(':palletNumber')
    async getByPalletNumber(@Param('palletNumber') palletNumber: string): Promise<PalletEventEntity[]> {
        return await this.palletEventService.getByPalletNumber(palletNumber);
    }

    @Post('addNew')
    async create(@Body() palletEventPayload: PalletEventCreationDto): Promise<{ palletNum: string, eventTime: Date }> {
        return await this.palletEventService.addNew(palletEventPayload);
    }
    
    @Get('/')
    async getAll(): Promise<PalletEventEntity[]> {
        return this.palletEventService.getAll();
    }
}
