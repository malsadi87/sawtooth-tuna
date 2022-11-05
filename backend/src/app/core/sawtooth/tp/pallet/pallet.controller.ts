import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PalletEntity } from '../../../../../entity/pallet.entity';
import { PalletCreationDto } from '../../../../utility/dto/tp/pallet-creation.dto';
import { PalletService } from './pallet.service';

@Controller('sawtooth/tp/pallet')
export class PalletController {
    constructor(private readonly palletService: PalletService) {}

    @Get(':palletNumber')
    async getById(@Param('palletNumber') palletNum: string): Promise<PalletEntity> {
        return await this.palletService.getByPalletNo(palletNum);
    }

    @Post('addNew')
    async create(@Body() palletPayload: PalletCreationDto): Promise<string> {
        return await this.palletService.addNewPallet(palletPayload);
    }

    @Get('verify/:palletNumber')
    async verify(@Param('palletNumber') palletNum: string): Promise<boolean> {
        return await this.palletService.verifyData(palletNum);
    }

    @Get('/')
    async getAll(): Promise<PalletEntity[]> {
        return this.palletService.getAll();
    }
}
