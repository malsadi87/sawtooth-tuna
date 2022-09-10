import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PalletEntity } from '../../../../../entity/pallet.entity';

@Injectable()
export class PalletRepository extends Repository<PalletEntity> {
    constructor(private dataSource: DataSource) {
        super(PalletEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<PalletEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByPalletNo(palletNumber: string): Promise<PalletEntity> {
        return await this.findOneBy({ palletNum: palletNumber });
    }

    async addNewPallet(newPallet: PalletEntity): Promise<string> {
        await newPallet.save();
        return newPallet.palletNum;
    }
}
