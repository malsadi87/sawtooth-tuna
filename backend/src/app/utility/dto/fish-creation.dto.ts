import { IsNumber, IsString } from 'class-validator';
import { KeyPairDto } from './key-pair.dto';

export class FishCreationDto {
    @IsString() name: string;
    @IsNumber() weight: number;
    @IsNumber() latitude: number;
    @IsNumber() longitude: number;
}

export class FishCreationWithKeyPairDto {
    fishData: FishCreationDto;
    keyPair: KeyPairDto
}