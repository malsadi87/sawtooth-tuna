import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from '../../../../../entity/trip.entity';
import { TripController } from './trip.controller';
import { TripRepository } from './trip.repository';
import { TripService } from './trip.service';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  controllers: [TripController],
  providers: [TripService, TripRepository]
})
export class TripModule {}
