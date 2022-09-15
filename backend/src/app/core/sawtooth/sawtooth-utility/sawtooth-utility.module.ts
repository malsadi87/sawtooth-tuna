import { Module } from '@nestjs/common';
import { SawtoothUtilityService } from './sawtooth-utility.service';
import { HttpModule } from '@nestjs/axios';
import { LoginUserInfoModule } from '../../../shared/loginUserInfo/login-user-info.module';

@Module({
  imports: [HttpModule, LoginUserInfoModule],
  providers: [SawtoothUtilityService],
  exports: [SawtoothUtilityService]
})
export class SawtoothUtilityModule {}
