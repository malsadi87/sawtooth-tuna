import { IsDateString, IsNumber, Length } from "class-validator";

export class CustomPackageCreationDto {
    @Length(1, 255)
    consumerPackageId: string;

    @Length(1, 255)
    pkCatch: string;

    @IsDateString()
    packingDate: Date;

    @IsNumber()
    agent: number;
}