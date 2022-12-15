import { Module } from '@nestjs/common';
import { CatchService } from './catch.service';
import { CatchController } from './catch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchRepository } from './catch.repository';
import { CatchEntity } from '../../../../../entity/catch.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { PalletModule } from '../pallet/pallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatchEntity]), 
    SawtoothUtilityModule,
    PalletModule
  ],
  providers: [CatchService, CatchRepository],
  exports: [CatchService],
  controllers: [CatchController]
})
export class CatchModule {}
