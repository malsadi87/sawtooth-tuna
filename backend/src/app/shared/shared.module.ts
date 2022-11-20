import { Module } from '@nestjs/common';
import { LoginUserInfoModule } from './loginUserInfo/login-user-info.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [LoginUserInfoModule, MailModule]
})
export class SharedModule {}
