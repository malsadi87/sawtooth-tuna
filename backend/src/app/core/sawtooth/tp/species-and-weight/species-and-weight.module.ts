import { Module } from '@nestjs/common';
import { SpeciesAndWeightService } from './species-and-weight.service';
import { SpeciesAndWeightController } from './species-and-weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesAndWeightRepository } from './species-and-weight.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesAndWeightRepository])],
  providers: [SpeciesAndWeightService],
  controllers: [SpeciesAndWeightController]
})
export class SpeciesAndWeightModule {}
