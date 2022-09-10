import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PalletEntity } from '../../../../../entity/pallet.entity';
import { PalletCreationDto } from '../../../../utility/dto/tp/pallet-creation.dto';
import { PalletService } from './pallet.service';

@Controller('sawtooth/tp/pallet')
export class PalletController {
    constructor(private readonly palletService: PalletService) {}

    @Get(':palletNumber')
    async getById(@Param('palletNumber') palletNumber: string): Promise<PalletEntity> {
        return await this.palletService.getByPalletNo(palletNumber);
    }

    @Post('addNew')
    @HttpCode(204)
    async create(@Body() palletPayload: PalletCreationDto): Promise<string> {
        return await this.palletService.addNewPallet(palletPayload);
    }
}
