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

    async getByPalletNumberAndEventTime(palletNumber: string, eventTime: Date): Promise<PalletEventEntity> {
        return await this.findOneBy({ palletNum: palletNumber, eventTime: eventTime });
    }

    async getByPalletNumber(palletNumber: string): Promise<PalletEventEntity[]> {
        return await this.findBy({ palletNum: palletNumber });
    }

    async addNew(newPalletEvent: PalletEventEntity): Promise<{ palletNum: string, eventTime: Date }> {
        await newPalletEvent.save();
        return { palletNum: newPalletEvent.palletNum, eventTime: newPalletEvent.eventTime };
    }
}
