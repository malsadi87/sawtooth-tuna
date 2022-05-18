import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ProductService } from './product.service';
import { ProductCreationWithKeyPairDto } from '../../../../utility/dto/product-creation.dto';

@Controller('sawtooth/tp/product')
export class ProductController {
    constructor(private fishService: ProductService) {}

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
    async createNew(@Body() fishCreationWithKeyPairDto: ProductCreationWithKeyPairDto): Promise<boolean> {
        return await this.fishService.createNew(fishCreationWithKeyPairDto.productData, fishCreationWithKeyPairDto.keyPair);
    }
}
