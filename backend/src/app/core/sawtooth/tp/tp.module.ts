import { Module } from '@nestjs/common';
import { UtilityService } from '../utility/utility.service';
import { HttpModule } from '@nestjs/axios';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
    imports: [HttpModule],
    controllers: [ProductController],
    providers: [ProductService, UtilityService]
})
export class TpModule {}
