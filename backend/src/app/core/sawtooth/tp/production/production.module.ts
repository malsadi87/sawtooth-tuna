import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductionEntity } from "src/entity/production.entity";
import { SawtoothUtilityModule } from "../../sawtooth-utility/sawtooth-utility.module";
import { PalletModule } from "../pallet/pallet.module";
import { ProductionController } from "./production.controller";
import { ProductionRepository } from "./production.repository";
import { ProductionService } from "./production.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductionEntity]),
    SawtoothUtilityModule,
    PalletModule
  ],
  providers: [ProductionService, ProductionRepository],
  exports: [ProductionService],
  controllers: [ProductionController]
})

export class ProductionModule {}