import { IsDateString, IsNumber } from "class-validator";

export class ConsumerPackageCreationDto {

    @IsDateString()
    packingDateTime: Date;

    @IsNumber()
    fkPallet: number;
}