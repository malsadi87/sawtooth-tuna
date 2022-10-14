import { Module } from '@nestjs/common';
import { PalletEventService } from './pallet-event.service';
import { PalletEventController } from './pallet-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletEventRepository } from './pallet-event.repository';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { PalletModule } from '../pallet/pallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PalletEventEntity]), 
    SawtoothUtilityModule,
    PalletModule
  ],
  providers: [PalletEventService, PalletEventRepository],
  controllers: [PalletEventController]
})
export class PalletEventModule {}
