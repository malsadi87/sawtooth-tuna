import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UtilityService } from '../utility/utility.service';
import { getProjectConfig } from '../../../utility/methods/helper.methods';
import { AssetCreationOperation } from '../../../utility/enum/asset-creation.enum';
import { MetaDataCreationDto } from '../../../utility/dto/meta-data-creation.dto';
import { KeyPairDto } from '../../../utility/dto/key-pair.dto';

@Injectable()
export class MetaDataService {
    private sawtoothConfig: any;

    constructor(
        private utilityService: UtilityService,
        private httpService: HttpService
    ) {
        this.sawtoothConfig = getProjectConfig('sawtooth');
    }

    async getByKey(key: string): Promise<AxiosResponse<any>> {
        const address = this.utilityService.getMetaKeyAddress(key);
        return await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${address}`));
    }

    async addNew(metaDataCreationDto: MetaDataCreationDto, keyPairDto: KeyPairDto): Promise<boolean> {
        return await this.utilityService.createAsset(AssetCreationOperation.Create, metaDataCreationDto, keyPairDto.publicKey, this.sawtoothConfig.FAMILY2, this.sawtoothConfig.VERSION2, this.sawtoothConfig.PREFIX2);
    }
}
