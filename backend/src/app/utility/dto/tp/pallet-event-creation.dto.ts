import { IsDateString, IsJSON, Length } from "class-validator";

export class PalletEventCreationDto {
    @IsDateString()
    eventTime: Date;

    @Length(1, 255)
    palletNum: string;

    @IsJSON()
    temperature: JSON;

    @IsJSON()
    location: JSON;

    @IsJSON()
    tilt: JSON;

    @IsJSON()
    shock: JSON;
}