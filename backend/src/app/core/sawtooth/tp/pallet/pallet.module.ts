import { Module } from '@nestjs/common';
import { PalletService } from './pallet.service';
import { PalletController } from './pallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletRepository } from './pallet.repository';
import { PalletEntity } from '../../../../../entity/pallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PalletEntity])],
  providers: [PalletService, PalletRepository],
  controllers: [PalletController]
})
export class PalletModule {}
