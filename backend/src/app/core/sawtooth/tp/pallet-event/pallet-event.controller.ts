import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { PalletEventCreationDto } from '../../../../utility/dto/tp/pallet-event-creation.dto';
import { PalletEventService } from './pallet-event.service';

@Controller('sawtooth/tp/pallet-event')
export class PalletEventController {
    constructor(private readonly palletEventService: PalletEventService) {}
    
    @Get(':pkPallet/:eventTime')
    async getByPkPalletAndEventDateTime(@Param('pkPallet') pkPallet: number, @Param('eventTime') eventTime: Date): Promise<PalletEventEntity> {
        return await this.palletEventService.getByPkPalletAndEventDateTime(pkPallet, eventTime);
    }

    @Get(':pkPallet')
    async getByPkPallet(@Param('pkPallet') pkPallet: number): Promise<PalletEventEntity[]> {
        return await this.palletEventService.getByPkPallet(pkPallet);
    }

    @Post('addNew')
    async create(@Body() palletEventPayload: PalletEventCreationDto): Promise<{ pkPalletEvent: number, eventTime: Date }> {
        return await this.palletEventService.addNew(palletEventPayload);
    }
    
    @Get('/')
    async getAll(): Promise<PalletEventEntity[]> {
        return this.palletEventService.getAll();
    }
}
