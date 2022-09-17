import { IsDateString, IsNumber, Length } from "class-validator";

export class SpeciesCreationDto {
    @IsNumber()
    quantity: number;

    @IsNumber()
    species: number;

    @Length(1, 255)
    catchPackageId: string;

    @IsDateString()
    launchDateTime: Date;
}