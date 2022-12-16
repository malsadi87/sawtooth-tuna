import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PalletEntity } from '../../../../../entity/pallet.entity';

@Injectable()
export class PalletRepository extends Repository<PalletEntity> {
    constructor(private dataSource: DataSource) {
        super(PalletEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<PalletEntity[]> {
        return await this.find();
    }

    async getByPkPallet(pkPallet: number): Promise<PalletEntity> {
        return await this.findOneBy({ pkPallet: pkPallet });
    }

    async addNewPallet(newPallet: PalletEntity): Promise<PalletEntity> {
        return await newPallet.save();
    }
}
