import { IsNumber, Length } from "class-validator";

export class CompanyCreationDto {

    @Length(1, 255)
    companyName: string;

    @Length(1, 255)
    companyAddress: string;

    @Length(1, 255)
    contactInfo: string;
}