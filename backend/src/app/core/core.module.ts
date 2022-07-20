import { Module } from '@nestjs/common';
import { FeatureModule } from '../feature/feature.module';
import { AuthModule } from './auth/auth.module';
import { SawtoothModule } from './sawtooth/sawtooth.module';
import { TestModule } from './test/test.module';

@Module({
    imports:[
        TestModule,
        AuthModule,
        SawtoothModule,
        FeatureModule
    ]
})
export class CoreModule {}
