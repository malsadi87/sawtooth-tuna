import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

@Module({
    imports:[
        TestModule,
        AuthModule
    ]
})
export class CoreModule {}
