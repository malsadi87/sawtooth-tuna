import { BaseEntity, DataSource, ObjectLiteral, Repository } from "typeorm";
import { SpeciesAndWeightEntity } from "../../../entity/speciesAndWeight.entity";

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
    // constructor(private dataSource: DataSource) {
    //     var x = new T();
    //     super(T, dataSource.createEntityManager());
    // }

    // async getAll(): Promise<T[]> {
    //     const result = await this.find();
    //     return result;
    // }

    // async getById(id: number): Promise<T> {
    //     return await this.findOneBy({ id: id });
    // }

    // async addNewTrip(newTrip: TripEntity): Promise<number> {
    //     await newTrip.save();
    //     return newTrip.tripNo;
    // }
}