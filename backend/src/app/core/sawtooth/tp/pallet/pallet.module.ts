import { Module } from '@nestjs/common';
import { PalletService } from './pallet.service';
import { PalletController } from './pallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletRepository } from './pallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PalletRepository])],
  providers: [PalletService],
  controllers: [PalletController]
})
export class PalletModule {}
