import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from '../../../../../entity/trip.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { TripController } from './trip.controller';
import { TripRepository } from './trip.repository';
import { TripService } from './trip.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TripEntity]), 
    SawtoothUtilityModule
  ],
  controllers: [TripController],
  exports: [TripService],
  providers: [TripService, TripRepository]
})
export class TripModule {}
