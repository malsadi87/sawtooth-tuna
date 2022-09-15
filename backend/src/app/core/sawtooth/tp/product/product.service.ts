import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductEntity } from '../../../../../entity/product.entity';
import { ProductCreationDto } from '../../../../utility/dto/tp/product-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    private readonly entityName: string;
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) { 
        this.entityName = 'product';
    }

    async getAllProduct(): Promise<ProductEntity[]> {
        return await this.productRepository.getAll();
    }

    async getByProductId(productId: number): Promise<ProductEntity> {
        return await this.productRepository.getByProductId(productId);
    }

    async addNewProduct(productPayload: ProductCreationDto): Promise<number> {
        let product: ProductEntity = plainToClass(ProductEntity, productPayload);
        const newProduct = await this.productRepository.addNewProduct(product);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newProduct, this.entityName, newProduct.productId);

        return newProduct.productId;
    }
}
