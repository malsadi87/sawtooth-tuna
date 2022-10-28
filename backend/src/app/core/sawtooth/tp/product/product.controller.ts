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

    @Get('productNum/:productNum')
    async getByProductNum(@Param('productNum') productNum: number): Promise<ProductEntity> {
        return await this.productService.getByProductNum(productNum);
    }

    @Post('addNew')
    async create(@Body() productPayload: ProductCreationDto): Promise<number> {
        return await this.productService.addNewProduct(productPayload);
    }

    @Get('/')
    async getAll(): Promise<ProductEntity[]> {
        return this.productService.getAllProduct();
    }
}
