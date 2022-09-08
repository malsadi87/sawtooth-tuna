import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripRepository } from './trip.repository';
import { TripService } from './trip.service';

@Module({
  imports: [TypeOrmModule.forFeature([TripRepository])],
  controllers: [TripController],
  providers: [TripService]
})
export class TripModule {}
