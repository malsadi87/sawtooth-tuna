import { Module } from '@nestjs/common';
import { SpeciesAndWeightService } from './species-and-weight.service';
import { SpeciesAndWeightController } from './species-and-weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesAndWeightRepository } from './species-and-weight.repository';
import { SpeciesAndWeightEntity } from '../../../../../entity/speciesAndWeight.entity';
import { SawtoothUtilityModule } from '../../sawtooth-utility/sawtooth-utility.module';
import { LoginUserInfoModule } from '../../../../shared/loginUserInfo/login-user-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpeciesAndWeightEntity]), 
    SawtoothUtilityModule,
    LoginUserInfoModule
  ],
  providers: [SpeciesAndWeightService, SpeciesAndWeightRepository],
  controllers: [SpeciesAndWeightController]
})
export class SpeciesAndWeightModule {}
