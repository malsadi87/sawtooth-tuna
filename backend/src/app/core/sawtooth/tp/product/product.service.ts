import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { getProjectConfig } from '../../../../utility/methods/helper.methods';
import { UtilityService } from '../../utility/utility.service';
import { ProductCreationDto } from '../../../../utility/dto/productCreation.dto';
import { KeyPairDto } from '../../../../utility/dto/keyPair.dto';
import { AssetCreationOperation } from '../../../../utility/enum/asset-creation.enum';
import { response } from 'express';

@Injectable()
export class ProductService {
    private sawtoothConfig: any;
    private familyName: string;
    private familyNamespace: string;

    constructor(
        private httpService: HttpService,
        private utilityService: UtilityService
    ) {
        this.familyName = 'product';
        this.familyNamespace = this.utilityService.getNamespace(this.familyName);
        this.sawtoothConfig = getProjectConfig('sawtooth')['TP']['PRODUCT'];
    }

    async getById(fishId: string): Promise<AxiosResponse<any>> {
        const fishAddress = this.utilityService.getAssetAddress(fishId, this.familyName);
        return await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${fishAddress}`));
    }

    async createNew(data: ProductCreationDto, keyPair: KeyPairDto): Promise<boolean> {
        const result = await this.utilityService.createAsset(AssetCreationOperation.Create, data, keyPair.privateKey, this.sawtoothConfig.FAMILY, this.sawtoothConfig.VERSION, this.familyNamespace);
        return result;
    }

    async getAll(): Promise<AxiosResponse<any>> {
        const response = await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${this.familyNamespace}`).pipe(map(x => x.data)));
        return response;
    }
}
