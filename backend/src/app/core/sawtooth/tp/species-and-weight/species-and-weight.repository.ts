import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';

@Injectable()
export class SpeciesAndWeightRepository extends Repository<SpeciesAndWeightEntity> {
    constructor(private dataSource: DataSource) {
        super(SpeciesAndWeightEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<SpeciesAndWeightEntity[]> {
        const result = await this.find();
        return result;
    }

    async getById(id: number): Promise<SpeciesAndWeightEntity> {
        return await this.findOneBy({ speciesId: id });
    }

    async getByDetails(quantity: number, species: number, catchPackageId: string, launchDateTime: Date): Promise<SpeciesAndWeightEntity> {
        return await this.findOneBy({ quantity: quantity, species: species, catchPackageId: catchPackageId, launchDateTime: launchDateTime });
    }

    async addNew(newSpecies: SpeciesAndWeightEntity): Promise<SpeciesAndWeightEntity> {
        return await newSpecies.save();
    }
}
