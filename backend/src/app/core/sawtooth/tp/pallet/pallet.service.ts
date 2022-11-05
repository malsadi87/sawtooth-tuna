import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getByPalletNo(palletNumber: string): Promise<PalletEntity> {
        const result = await this.palletRepository.getByPalletNo(palletNumber);
        if (!result)
            throw new NotFoundException('Pallet Not Found!');
        return result;
    }

    async addNewPallet(palletPayload: PalletCreationDto): Promise<string> {
        const pallet = plainToClass(PalletEntity, palletPayload);
        const oldPallet = await this.palletRepository.getByPalletNo(pallet.palletNum);

        if (oldPallet) throw new BadRequestException(`Pallet with number - ${pallet.palletNum}, Already Exist!`);

        const newPallet = await this.palletRepository.addNewPallet(pallet);

        // Save in Sawtooth
        await this.sawtoothUtilityService.createAsset(newPallet, this.entityName);

        return newPallet.palletNum;
    }

    async verifyData(palletNumber: string): Promise<boolean> {
        /**
         * Get the whole entity from DB
         * As, Entity cound change between time, by another client
         * And, getting the whole entity from Frontend, is not safe
         */
        const result = await this.palletRepository.getByPalletNo(palletNumber);
        if (!result) throw new NotFoundException(`Pallet with Number - ${palletNumber} Not Found!`);

        return this.sawtoothUtilityService.verifyAsset(result, this.entityName);
    }
}
