import { IsNumber, Length, Max, Min } from "class-validator";

export class PalletCreationDto {

  @Length(1, 255)
    palletId: string;

  @IsNumber()
    @Max(99999.9999)
    quantity: number;

  @IsNumber()
    fkCompany: number;
}