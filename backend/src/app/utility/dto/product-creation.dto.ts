import { IsNumber, IsString } from 'class-validator';
import { KeyPairDto } from './key-pair.dto';

export class ProductCreationDto {
    @IsString() name: string;
    @IsNumber() weight: number;
    @IsNumber() latitude: number;
    @IsNumber() longitude: number;
}

export class ProductCreationWithKeyPairDto {
    productData: ProductCreationDto;
    keyPair: KeyPairDto
}