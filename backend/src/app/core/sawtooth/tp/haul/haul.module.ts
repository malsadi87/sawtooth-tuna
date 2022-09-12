import { Module } from '@nestjs/common';
import { HaulService } from './haul.service';
import { HaulController } from './haul.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HaulRepository } from './haul.repository';
import { HaulEntity } from '../../../../../entity/haul.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { LoginUserInfoModule } from '../../../../shared/loginUserInfo/login-user-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HaulEntity]), 
    SawtoothUtilityModule,
    LoginUserInfoModule
  ],
  providers: [HaulService, HaulRepository],
  controllers: [HaulController]
})
export class HaulModule {}
