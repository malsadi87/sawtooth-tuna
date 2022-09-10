import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PalletEntity } from '../../../../../entity/pallet.entity';
import { PalletCreationDto } from '../../../../utility/dto/tp/pallet-creation.dto';
import { PalletRepository } from './pallet.repository';

@Injectable()
export class PalletService {
    constructor(private palletRepository: PalletRepository)
    {}

    async getAll(): Promise<PalletEntity[]> {
        return await this.palletRepository.getAll();
    }

    async getByPalletNo(palletNumber: string): Promise<PalletEntity> {
        return await this.palletRepository.getByPalletNo(palletNumber);
    }

    async addNewPallet(palletPayload: PalletCreationDto): Promise<string> {
        const pallet = plainToClass(PalletEntity, palletPayload);
        return await this.palletRepository.addNewPallet(pallet);
    }
}
