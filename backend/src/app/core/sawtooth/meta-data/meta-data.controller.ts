import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { MetaDataCreationWithKeyPairDto } from '../../../utility/dto/metaDataCreation.dto';
import { MetaDataService } from './meta-data.service';

@Controller('sawtooth/meta-data')
export class MetaDataController {
    constructor(private metaDataService: MetaDataService) {}

    @Get('/get/:key')
    async GetByKey(@Param('key') key: string): Promise<AxiosResponse<any>> {
        return await this.metaDataService.getByKey(key);
    }

    @Post('/add')
    async Add(@Body() metaDataCreationWithKeyPairDto: MetaDataCreationWithKeyPairDto): Promise<boolean> {
        return await this.metaDataService.addNew(metaDataCreationWithKeyPairDto.metaData, metaDataCreationWithKeyPairDto.keyPair);
    }
}
