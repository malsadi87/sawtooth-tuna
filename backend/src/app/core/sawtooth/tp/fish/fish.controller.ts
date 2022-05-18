import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { FishService } from './fish.service';
import { FishCreationWithKeyPairDto } from '../../../../utility/dto/fish-creation.dto';

@Controller('sawtooth/tp/fish')
export class FishController {
    constructor(private fishService: FishService) {}

    @Get('/')
    async getAll(): Promise<AxiosResponse<any>> {
        // TODO:: Cound filter data after seeing the response
        return await this.fishService.getAll();
    }

    @Get('/getById/:id')
    async GetById(@Param('id') id: string): Promise<AxiosResponse<any>> {
        // TODO:: Cound filter data after seeing the response
        return await this.fishService.getById(id);
    }

    //TODO:: JWT integration will impact this
    @Post('/new')
    async createNew(@Body() fishCreationWithKeyPairDto: FishCreationWithKeyPairDto): Promise<boolean> {
        return await this.fishService.createNew(fishCreationWithKeyPairDto.fishData, fishCreationWithKeyPairDto.keyPair);
    }
}
