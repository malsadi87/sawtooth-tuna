import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getProjectConfig } from '../../../utility/methods/helper.methods';
import { MetaDataCreationDto } from '../../../utility/dto/metaData-creation.dto';
import { KeyPairDto } from '../../../utility/dto/keyPair.dto';
import { SawtoothUtilityService } from '../sawtooth-utility/sawtooth-utility.service';

@Injectable()
export class MetaDataService {
    private readonly sawtoothConfig: any;
    private readonly familyName: string;

    constructor(
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly httpService: HttpService
    ) {
        this.familyName = 'cross-chain';
        this.sawtoothConfig = getProjectConfig('sawtooth');
    }

    async getByKey(key: string): Promise<AxiosResponse<any>> {
        const address = this.sawtoothUtilityService.getMetaKeyAddress(key, this.familyName);
        return await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${address}`));
    }

    async addNew(metaDataCreationDto: MetaDataCreationDto, keyPairDto: KeyPairDto): Promise<boolean> {
        var result =  await this.sawtoothUtilityService.createAsset(metaDataCreationDto, keyPairDto.privateKey, this.familyName);
        return !!result;
    }
}
