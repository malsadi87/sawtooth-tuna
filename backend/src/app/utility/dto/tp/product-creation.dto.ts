import { IsNumber, Length } from "class-validator";

export class ProductCreationDto {
    @IsNumber()
    productId: number;

    @Length(1, 255)
    productName: string;

    @Length(1, 255)
    productDescription: string;

    @IsNumber()
    productNum: number;

}