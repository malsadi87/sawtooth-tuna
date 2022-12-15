import { IsNumber, Length } from "class-validator";

export class ProductCreationDto {

    @Length(1, 255)
    title: string;

    @Length(1, 255)
    productId: string;

    @IsNumber()
    fkSpecies: number;
}