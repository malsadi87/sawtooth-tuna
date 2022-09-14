import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ProductEntity } from '../../../../../entity/product.entity';
import { ProductCreationDto } from '../../../../utility/dto/tp/product-creation.dto';
import { ProductService } from './product.service';

@Controller('sawtooth/tp/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('/:productId')
    async getById(@Param('productId') productId: number): Promise<ProductEntity> {
        return await this.productService.getByProductId(productId);
    }

    @Post('addNew')
    @HttpCode(204)
    async create(@Body() productPayload: ProductCreationDto): Promise<number> {
        return await this.productService.addNewProduct(productPayload);
    }

    @Get('/')
    async hallo(): Promise<String> {
        return this.productService.testMe();
    }
}
