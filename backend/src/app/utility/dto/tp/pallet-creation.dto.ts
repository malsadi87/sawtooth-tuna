import { IsNumber, Length, Max, Min } from "class-validator";

export class PalletCreationDto {

    @IsNumber()
    productNum: number;

    @IsNumber()
    supplierId: number;

    @IsNumber()
    @Max(99999.9999)
    palletWeight: number;

    @IsNumber()
    tripNo: number;
}