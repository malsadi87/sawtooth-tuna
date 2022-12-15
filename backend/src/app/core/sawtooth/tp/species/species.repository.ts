import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SpeciesEntity } from '../../../../../entity/species.entity';

@Injectable()
export class SpeciesRepository extends Repository<SpeciesEntity> {
    constructor(private dataSource: DataSource) {
        super(SpeciesEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<SpeciesEntity[]> {
        const result = await this.find();
        return result;
    }

    async getById(id: number): Promise<SpeciesEntity> {
        return await this.findOneBy({ pkSpecies: id });
    }

    async addNew(newSpecies: SpeciesEntity): Promise<SpeciesEntity> {
        return await newSpecies.save();
    }
}
