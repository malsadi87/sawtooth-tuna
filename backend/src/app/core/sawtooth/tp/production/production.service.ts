import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ProductionCreationDto } from "../../../../utility/dto/tp/production-creation.dto";
import { ProductionEntity } from "../../../../../entity/production.entity";
import { ProductionRepository } from "./production.repository";
import { SawtoothUtilityService } from '../../sawtooth-utility/sawtooth-utility.service';

@Injectable()
export class ProductionService {
  private readonly familyName: string;
  constructor(
    private readonly productionRepository: ProductionRepository,
    private readonly sawtoothUtilityService: SawtoothUtilityService
  ) {
    this.familyName='production';
  }

  async getAll(): Promise<ProductionEntity[]> {
    return await this.productionRepository.getAll();
  }

  async getById(id: number): Promise<ProductionEntity> {
    const result = await this.productionRepository.getById(id);
    if (!result) {
      throw new NotFoundException('Production not found!')
    }
    return result
  }

  async addNewProduction(productionPayload: ProductionCreationDto): Promise<number> {
    try {
      const productionObject = plainToClass(ProductionEntity, productionPayload)
      const newProduction = await this.productionRepository.addNewProduction(productionObject);

      await this.sawtoothUtilityService.createAsset(newProduction, this.familyName);

      return newProduction.pkProduction;
    } catch(e) {
      throw e;
    }
  }

}