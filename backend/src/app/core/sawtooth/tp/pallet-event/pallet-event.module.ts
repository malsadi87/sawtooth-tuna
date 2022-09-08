import { Module } from '@nestjs/common';
import { PalletEventService } from './pallet-event.service';
import { PalletEventController } from './pallet-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletEventRepository } from './pallet-event.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PalletEventRepository])],
  providers: [PalletEventService],
  controllers: [PalletEventController]
})
export class PalletEventModule {}
