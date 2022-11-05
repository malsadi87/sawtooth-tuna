import { IsDateString, IsNotEmpty, IsNumber, Length, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class Tilt {
    @IsNumber({ maxDecimalPlaces: 5 }, { message: "x Has to be a number and can have at max 5 decimal place" })
    @IsNotEmpty({ message: " required a poperty named x" })
    x: number;

    @IsNumber({ maxDecimalPlaces: 5 }, { message: "y Has to be a number and can have at max 5 decimal place" })
    @IsNotEmpty({ message: " required a poperty named y" })
    y: number;
}

class Shock {
    @IsNumber({ maxDecimalPlaces: 5 }, { message: "acceleration Has to be a number and can have at max 5 decimal place" })
    @IsNotEmpty({ message: " required a poperty named acceleration" })
    acceleration: number;

    @IsNumber({ maxDecimalPlaces: 5 }, { message: "y Has to be a number and can have at max 5 decimal place" })
    @IsNotEmpty({ message: " required a poperty named y" })
    y: number;
}

class Location {
    @IsNumber({ maxDecimalPlaces: 3 }, { message: "latitude Has to be a number and can have at max 3 decimal place" })
    @IsNotEmpty({ message: " required a poperty named latitude" })
    latitude: number;

    @IsNumber({ maxDecimalPlaces: 3 }, { message: "longitude Has to be a number and can have at max 3 decimal place" })
    @IsNotEmpty({ message: " required a poperty named longitude" })
    longitude: number;
}

export class PalletEventCreationDto {
    @IsDateString()
    eventTime: Date;

    @Length(1, 255)
    palletNum: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    temperature: number;

    @ValidateNested()
    @Type(() => Tilt)
    tilt: Tilt;

    @ValidateNested()
    @Type(() => Shock)
    shock: Shock;

    @ValidateNested()
    @Type(() => Location)
    location: Location;
}