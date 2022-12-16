import { IsNumber, IsString, IsArray } from 'class-validator';
import { KeyPairDto } from './keyPair.dto';

// TODO: Why are there two ProductCreationDto's? Can this one be deleted?
export class ProductCreationDto {
    @IsNumber() pkProduct: number;
    @IsString() title: string;
    @IsString() palletId: string;
    @IsNumber() fkSpecies: number;
    @IsArray() productAttribute: { name: string, value: string }[]
}

export class ProductCreationWithKeyPairDto {
    productData: ProductCreationDto;
    keyPair: KeyPairDto
}