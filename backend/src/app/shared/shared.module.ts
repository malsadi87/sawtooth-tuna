import { Module } from '@nestjs/common';
import { LoginUserInfoModule } from './loginUserInfo/login-user-info.module';

@Module({
    imports: [LoginUserInfoModule]
})
export class SharedModule {}
