import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';

@Controller('sawtooth/pallet-event')
export class PalletEventController {
    
    @Get(':id')
    async getById(@Param('id') id: number): Promise<PalletEventEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
