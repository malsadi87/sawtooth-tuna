import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';

@Injectable()
export class PalletEventRepository extends Repository<PalletEventEntity> {
    constructor(private dataSource: DataSource) {
        super(PalletEventEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<PalletEventEntity[]> {
        const result = await this.find();
        return result;
    }

    async getByPkPalletAndEventDateTime(pkPallet: number, eventTime: Date): Promise<PalletEventEntity> {
        return await this.findOneBy({ fkPallet: pkPallet, eventTime: eventTime });
    }

    async getByPkPallet(pkPallet: number): Promise<PalletEventEntity[]> {
        return await this.findBy({ fkPallet: pkPallet });
    }

    async addNew(newPalletEvent: PalletEventEntity): Promise<PalletEventEntity> {
        return await newPalletEvent.save();
    }
}
