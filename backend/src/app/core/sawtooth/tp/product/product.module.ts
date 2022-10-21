import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../../../../entity/product.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]), 
    SawtoothUtilityModule
  ],
  controllers: [ProductController],
  exports: [ProductService],
  providers: [ProductService, ProductRepository]
})
export class ProductModule {}
