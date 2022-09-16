import { IsDateString, IsLatitude, IsLongitude, IsNumber, Length } from "class-validator";

export class HaulCreationDto {
    @IsDateString()
    launchDateTime: Date;

    @Length(1, 255)
    launchPosition: string;

    @IsLatitude()
    launchLatitude: number;

    @IsLongitude()
    launchLongitude: number;

    @IsDateString()
    haulDateTime: Date;

    @Length(1, 255)
    haulPosition: string;

    @IsLatitude()
    haulLatitude: number;

    @IsLongitude()
    haulLongitude: number;

    @IsNumber()
    tripNo: number;
}