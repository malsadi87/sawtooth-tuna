import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../../../../entity/product.entity';
import { LoginUserInfoModule } from '../../../../shared/loginUserInfo/login-user-info.module';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]), 
    SawtoothUtilityModule,
    LoginUserInfoModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository]
})
export class ProductModule {}
