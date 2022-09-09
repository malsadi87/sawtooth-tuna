import { Module } from '@nestjs/common';
import { PalletEventService } from './pallet-event.service';
import { PalletEventController } from './pallet-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletEventRepository } from './pallet-event.repository';
import { PalletEventEntity } from '../../../../../entity/palletEvent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PalletEventEntity])],
  providers: [PalletEventService, PalletEventRepository],
  controllers: [PalletEventController]
})
export class PalletEventModule {}