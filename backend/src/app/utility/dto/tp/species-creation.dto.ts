import { IsDateString, IsNumber, Length } from "class-validator";

export class SpeciesCreationDto {

    @Length(1, 255)
    name: string;

    @Length(1, 255)
    description: string;

}