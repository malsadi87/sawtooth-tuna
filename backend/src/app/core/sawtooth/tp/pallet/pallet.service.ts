import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { resourceLimits } from 'worker_threads';
import { PalletEntity } from '../../../../../entity/pallet.entity';
import { PalletCreationDto } from '../../../../utility/dto/tp/pallet-creation.dto';
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';
import { PalletRepository } from './pallet.repository';

@Injectable()
export class PalletService {
    private readonly entityName: string;
    constructor(
        private palletRepository: PalletRepository,
        private readonly sawtoothUtilityService: SawtoothUtilityService
    ) {
        this.entityName = 'pallet';
    }

    async getAll(): Promise<PalletEntity[]> {
        const result = await this.palletRepository.getAll();
        return result;
    }

    async getByPkPallet(pkPallet: number): Promise<PalletEntity> {
        const result = await this.palletRepository.getByPkPallet(pkPallet);
        if (!result)
            throw new NotFoundException('Pallet Not Found!');
        return result;
    }

    async addNewPallet(palletPayload: PalletCreationDto): Promise<number> {
        const pallet = plainToClass(PalletEntity, palletPayload);
        Logger.log("******PALLET!")
        const newPallet = await this.palletRepository.addNewPallet(pallet);
        Logger.log(newPallet)
        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newPallet, this.entityName);

        return newPallet.pkPallet;
    }
}
