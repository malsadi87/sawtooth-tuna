import { IsNumber, IsString } from 'class-validator';
import { KeyPairDto } from './key-pair.dto';

export class ProductCreationDto {
    @IsNumber() productId: number;
    @IsString() productName: string;
    @IsString() description: string;
    @IsNumber() productNumber: number;
    attribute: { name: string, value: string }[]
}

export class ProductCreationWithKeyPairDto {
    productData: ProductCreationDto;
    keyPair: KeyPairDto
}