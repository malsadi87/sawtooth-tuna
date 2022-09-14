import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductEntity } from '../../../../../entity/product.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { ProductCreationDto } from '../../../../utility/dto/tp/product-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    private readonly familyName: string;
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) { 
        this.familyName = 'product';
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
        
        // Get the userInfo
        const userInfo = this.loginUserInfoService.getInfo();

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newProduct, userInfo.blockChainPrivateKey, this.familyName);

        return newProduct.productId;
    }
}
