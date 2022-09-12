import { Module } from '@nestjs/common';
import { LoginUserInfoService } from './login-user-info.service';

@Module({
  providers: [LoginUserInfoService],
  exports: [LoginUserInfoService]
})
export class LoginUserInfoModule {}
