import { IsDateString, IsNumber, Length } from "class-validator";

export class TripCreationDto {
    @IsNumber()
    tripNo: number;

    @IsNumber()
    tripWithinYearNo: number;

    @Length(1, 255)
    vesselName: string;

    @IsDateString()
    departureDate: Date;

    @Length(1, 255)
    departurePort: string;

    @IsDateString()
    landingDate: Date;

    @Length(1, 255)
    landingPort: string;
}