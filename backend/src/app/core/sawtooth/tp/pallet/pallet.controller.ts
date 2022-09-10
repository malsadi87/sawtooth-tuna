import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PalletEntity } from '../../../../../entity/pallet.entity';

@Controller('sawtooth/pallet')
export class PalletController {

    @Get(':id')
    async getById(@Param('id') id: number): Promise<PalletEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
