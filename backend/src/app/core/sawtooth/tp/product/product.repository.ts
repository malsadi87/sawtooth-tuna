import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ProductEntity } from '../../../../../entity/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
    constructor(private dataSource: DataSource) {
        super(ProductEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<ProductEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByProductId(productId: number): Promise<ProductEntity> {
        return await this.findOneBy({ productId: productId });
    }
    
    async getByProductNum(productNum: number): Promise<ProductEntity> {
      return await this.findOneBy({ productNum: productNum });
    }

    async addNewProduct(newProduct: ProductEntity): Promise<ProductEntity> {
        return await newProduct.save();
    }
}
