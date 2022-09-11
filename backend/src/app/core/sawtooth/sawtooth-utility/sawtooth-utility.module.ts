import { Module } from '@nestjs/common';
import { SawtoothUtilityService } from './sawtooth-utility.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SawtoothUtilityService],
  exports: [SawtoothUtilityService]
})
export class SawtoothUtilityModule {}
