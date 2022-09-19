import { IsDateString, Length } from "class-validator";

export class CatchPackageCreationDto {
    @Length(1, 255)
    catchPackageId: string;

    @IsDateString()
    packingDate: Date;

    @Length(1, 255)
    palletNum: string;
}