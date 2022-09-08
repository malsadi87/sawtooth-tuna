import { Module } from '@nestjs/common';
import { HaulService } from './haul.service';
import { HaulController } from './haul.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HaulRepository } from './haul.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HaulRepository])],
  providers: [HaulService],
  controllers: [HaulController]
})
export class HaulModule {}
