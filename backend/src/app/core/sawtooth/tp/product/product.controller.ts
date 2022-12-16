import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ProductEntity } from '../../../../../entity/product.entity';
import { ProductCreationDto } from '../../../../utility/dto/tp/product-creation.dto';
import { ProductService } from './product.service';

@Controller('sawtooth/tp/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('/:pkProduct')
    async getById(@Param('pkProduct') pkProduct: number): Promise<ProductEntity> {
        return await this.productService.getByPkProduct(pkProduct);
    }

    @Get('palletId/:palletId')
    async getByPalletId(@Param('palletId') palletId: string): Promise<ProductEntity> {
        return await this.productService.getByPalletId(palletId);
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
