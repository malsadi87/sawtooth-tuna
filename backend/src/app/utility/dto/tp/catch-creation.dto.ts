import { IsDateString, IsNumber } from "class-validator";

export class CatchCreationDto {

    @IsDateString()
    updatedDateTime: Date;

    @IsNumber()
    quantity: number;

    @IsNumber()
    fkHaul: number;

    @IsNumber()
    fkSpecies: number;
}