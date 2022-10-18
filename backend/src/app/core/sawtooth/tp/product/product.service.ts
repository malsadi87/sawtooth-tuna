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

    async getByProductId(productId: number): Promise<ProductEntity> {
        const result = await this.productRepository.getByProductId(productId);
        if (!result)
            throw new NotFoundException('Product not found!');
        return result;
    }

    async getByProductNum(productNum: number): Promise<ProductEntity[]> {
      return await this.productRepository.getByProductNum(productNum);
  }

    async addNewProduct(productPayload: ProductCreationDto): Promise<number> {
        try {
            const product: ProductEntity = plainToClass(ProductEntity, productPayload);
            const oldProduct = await this.productRepository.getByProductId(product.productId);

            if (oldProduct) throw new BadRequestException('Product already exist');

            const newProduct = await this.productRepository.addNewProduct(product);
    
            // Save in Sawtooth
            await this.sawtoothUtilityService.createAsset(newProduct, this.entityName);
    
            return newProduct.productId;
        } catch(e) {
            throw e;
        }
    }
}
