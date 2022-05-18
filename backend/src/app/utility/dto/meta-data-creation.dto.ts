import { KeyPairDto } from "./key-pair.dto";
import { IsString } from 'class-validator';

export class MetaDataCreationDto {
    @IsString() key: string;
    @IsString() value: string;
}

export class MetaDataCreationWithKeyPairDto {
    metaData: MetaDataCreationDto;
    keyPair: KeyPairDto;
}