import { IsNumber, Length } from "class-validator";

export class CompanyCreationDto {
    @IsNumber()
    companyId: number;

    @Length(1, 255)
    companyName: string;

    @Length(1, 255)
    companyAddress: string;

    @Length(1, 255)
    contactInfo: string;
}