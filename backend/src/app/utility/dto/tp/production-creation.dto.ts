import { IsDateString, IsNumber, Length } from "class-validator";

export class ProductionCreationDto {

    @IsDateString()
    productionDate: Date;

    @IsNumber()
    fkPallet: number;

    @IsNumber()
    fkProduct: number;

    @IsNumber()
    fkHaul: number;
}