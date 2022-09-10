import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import path from 'path';
import { IdentityModule } from './identity/identity.module';
import { SawtoothModule } from './sawtooth/sawtooth.module';
import { TpModule } from './sawtooth/tp/tp.module';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        IdentityModule,
        SawtoothModule,
        TestModule
    ]
})
export class CoreModule {}
