import { Module } from '@nestjs/common';
import { HaulService } from './haul.service';
import { HaulController } from './haul.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HaulRepository } from './haul.repository';
import { HaulEntity } from '../../../../../entity/haul.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HaulEntity])],
  providers: [HaulService, HaulRepository],
  controllers: [HaulController]
})
export class HaulModule {}
