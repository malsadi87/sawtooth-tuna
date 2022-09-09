import { KeyPairDto } from "./keyPair.dto";
import { IsString } from 'class-validator';

export class MetaDataCreationDto {
    @IsString() key: string;
    @IsString() value: string;
}

export class MetaDataCreationWithKeyPairDto {
    metaData: MetaDataCreationDto;
    keyPair: KeyPairDto;
}