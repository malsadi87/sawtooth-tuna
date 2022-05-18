import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FishService } from './fish.service';
import { FishCreationWithKeyPairDto } from '../../../../utility/dto/fish-creation.dto';

@Controller('sawtooth/fish')
export class FishController {
    constructor(private fishService: FishService) {}

    @Get('/')
    getAll(): Observable<AxiosResponse<any>> {
        // TODO:: Cound filter data after seeing the response
        return this.fishService.getAll();
    }

    @Get('/getById/:id')
    GetById(@Param('id') id: string): Observable<AxiosResponse<any>> {
        // TODO:: Cound filter data after seeing the response
        return this.fishService.getById(id);
    }

    //TODO:: JWT integration will impact this
    @Post('/new')
    createNew(@Body() fishCreationWithKeyPairDto: FishCreationWithKeyPairDto): Promise<boolean> {
        return this.fishService.createNew(fishCreationWithKeyPairDto.fishData, fishCreationWithKeyPairDto.keyPair);
    }
}
