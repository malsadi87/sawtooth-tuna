import { IsDateString, IsNumber, Length } from "class-validator";
import { IsEqualOrGreaterThan } from "../../decorator/isEqualOrGreaterThan.decorator";

export class TripCreationDto {

    @IsNumber()
    tripWithinYearNo: number;

    @Length(1, 255)
    vesselName: string;

    @IsDateString()
    departureDate: Date;

    @Length(1, 255)
    departurePort: string;

    @IsDateString()
    @IsEqualOrGreaterThan('departureDate')
    landingDate: Date;

    @Length(1, 255)
    landingPort: string;
}