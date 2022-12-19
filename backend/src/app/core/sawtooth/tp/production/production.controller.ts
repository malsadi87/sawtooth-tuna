import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductionCreationDto } from "../../../../utility/dto/tp/production-creation.dto";
import { ProductionEntity } from "../../../../../entity/production.entity";
import { ProductionService } from "./production.service";

@Controller('sawtooth/tp/production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<ProductionEntity> {
    return await this.productionService.getById(id);
  }

  @Post('addNew')
  async create(@Body() productionPayload: ProductionCreationDto): Promise<number> {
    return await this.productionService.addNewProduction(productionPayload);
  }

  @Get('/')
  async getAll(): Promise<ProductionEntity[]> {
    return this.productionService.getAll()
  }
}