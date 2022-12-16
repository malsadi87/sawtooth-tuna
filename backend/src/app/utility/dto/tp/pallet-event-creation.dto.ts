import { IsDateString, IsJSON, IsNumber, Length } from "class-validator";

export class PalletEventCreationDto {
    @IsDateString()
    eventTime: Date;

    @IsNumber()
    temperature: number;

    @IsJSON()
    location: JSON;

    @IsJSON()
    tilt: JSON;

    @IsJSON()
    shock: JSON;

    @IsNumber()
    fkPallet: number;

}