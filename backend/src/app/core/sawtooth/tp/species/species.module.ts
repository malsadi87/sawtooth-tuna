import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesRepository } from './species.repository';
import { SpeciesEntity } from '../../../../../entity/species.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpeciesEntity]), 
    SawtoothUtilityModule
  ],
  providers: [SpeciesService, SpeciesRepository],
  exports: [SpeciesService],
  controllers: [SpeciesController]
})
export class SpeciesModule {}
