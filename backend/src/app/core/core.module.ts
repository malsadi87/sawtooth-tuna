import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SawtoothModule } from './sawtooth/sawtooth.module';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        //AuthModule,
        SawtoothModule,
        TestModule
    ]
})
export class CoreModule {}
