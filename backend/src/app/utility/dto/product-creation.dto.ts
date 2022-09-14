import { IsNumber, IsString, IsArray } from 'class-validator';
import { KeyPairDto } from './keyPair.dto';

export class ProductCreationDto {
    @IsNumber() productId: number;
    @IsString() productName: string;
    @IsString() productDescription: string;
    @IsNumber() productNum: number;
    @IsArray() productAttribute: { name: string, value: string }[]
}

export class ProductCreationWithKeyPairDto {
    productData: ProductCreationDto;
    keyPair: KeyPairDto
}