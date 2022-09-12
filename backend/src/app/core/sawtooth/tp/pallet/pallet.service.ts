import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PalletEntity } from '../../../../../entity/pallet.entity';
import { LoginUserInfoService } from '../../../../shared/loginUserInfo/login-user-info.service';
import { PalletCreationDto } from '../../../../utility/dto/tp/pallet-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletRepository } from './pallet.repository';

@Injectable()
export class PalletService {
    private readonly familyName: string;
    constructor(
        private palletRepository: PalletRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService,
        private readonly loginUserInfoService: LoginUserInfoService
    ) {
        this.familyName = 'pallet';
    }

    async getAll(): Promise<PalletEntity[]> {
        return await this.palletRepository.getAll();
    }

    async getByPalletNo(palletNumber: string): Promise<PalletEntity> {
        return await this.palletRepository.getByPalletNo(palletNumber);
    }

    async addNewPallet(palletPayload: PalletCreationDto): Promise<string> {
        const pallet = plainToClass(PalletEntity, palletPayload);
        const newPallet = await this.palletRepository.addNewPallet(pallet);

        // Get the userInfo
        const userInfo = this.loginUserInfoService.getInfo();

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newPallet, userInfo.blockChainPrivateKey, this.familyName);

        return newPallet.palletNum;
    }
}
