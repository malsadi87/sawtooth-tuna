import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { getProjectConfig } from '../../../../utility/methods/helper.methods';
import { UtilityService } from '../../utility/utility.service';
import { FishCreationDto } from '../../../../utility/dto/fish-creation.dto';
import { KeyPairDto } from '../../../../utility/dto/key-pair.dto';
import { AssetCreationOperation } from '../../../../utility/enum/asset-creation.enum';

@Injectable()
export class FishService {
    private sawtoothConfig: any;

    constructor(
        private httpService: HttpService,
        private utilityService: UtilityService
    ) {
        this.sawtoothConfig = getProjectConfig('sawtooth');
    }

    getById(fishId: string): Observable<AxiosResponse<any>> {
        const fishAddress = this.utilityService.getAssetAddress(fishId);
        return this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${fishAddress}`);
    }

    async createNew(data: FishCreationDto, keyPair: KeyPairDto): Promise<boolean> {
        return await this.utilityService.createAsset(AssetCreationOperation.Create, data, keyPair.privateKey);
    }



    getAll(): Observable<AxiosResponse<any>> {
        return this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${this.sawtoothConfig.PREFIX}`);
    }
}
