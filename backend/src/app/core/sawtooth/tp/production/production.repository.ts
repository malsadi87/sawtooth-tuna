import { Injectable } from "@nestjs/common";
import { ProductionEntity } from "src/entity/production.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProductionRepository extends Repository<ProductionEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductionEntity, dataSource.createEntityManager());
  }

  async getById(id: number):
  Promise<ProductionEntity> {
    return await this.findOneBy({ pkProduction: id })
  }

  async getAll(): Promise<ProductionEntity[]> {
    return await this.find();
  }

  async addNewProduction(productionObject: ProductionEntity): Promise<ProductionEntity> {
    return await productionObject.save();
  }
}