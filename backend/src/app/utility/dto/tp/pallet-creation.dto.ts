import { IsNumber, Length, Max, Min } from "class-validator";

export class PalletCreationDto {
    @Length(1, 255)
    palletNum: string;

    @IsNumber()
    productId: number;

    @Length(1, 255)
    supplierId: string;

    @IsNumber()
    @Max(99999.9999)
    palletWeight: number;

    @IsNumber()
    pkTrip: number;
}