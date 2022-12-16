import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getByPkProduct(pkProduct: number): Promise<ProductEntity> {
        const result = await this.productRepository.getByPkProduct(pkProduct);
        if (!result)
            throw new NotFoundException('Product not found!');
        return result;
    }

    async getByPalletId(palletId: string): Promise<ProductEntity> {
      return await this.productRepository.getByPalletId(palletId);
  }

    async addNewProduct(productPayload: ProductCreationDto): Promise<number> {
        try {
            const product: ProductEntity = plainToClass(ProductEntity, productPayload);
            const newProduct = await this.productRepository.addNewProduct(product);
    
            // Save in Sawtooth
            await this.sawtoothUtilityService.createAsset(newProduct, this.entityName);
    
            return newProduct.pkProduct;
        } catch(e) {
            throw e;
        }
    }
}
