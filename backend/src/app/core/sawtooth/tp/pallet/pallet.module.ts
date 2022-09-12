import { Module } from '@nestjs/common';
import { PalletService } from './pallet.service';
import { PalletController } from './pallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletRepository } from './pallet.repository';
import { PalletEntity } from '../../../../../entity/pallet.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { LoginUserInfoModule } from '../../../../shared/loginUserInfo/login-user-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PalletEntity]), 
    SawtoothUtilityModule,
    LoginUserInfoModule
  ],
  providers: [PalletService, PalletRepository],
  controllers: [PalletController]
})
export class PalletModule {}
