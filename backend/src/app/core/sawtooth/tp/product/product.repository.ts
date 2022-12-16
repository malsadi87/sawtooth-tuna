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

    async getByPkProduct(pkProduct: number): Promise<ProductEntity> {
        return await this.findOneBy({ pkProduct: pkProduct });
    }
    
    async getByPalletId(palletId: string): Promise<ProductEntity> {
      return await this.findOneBy({ palletId: palletId });
    }

    async addNewProduct(newProduct: ProductEntity): Promise<ProductEntity> {
        return await newProduct.save();
    }
}
