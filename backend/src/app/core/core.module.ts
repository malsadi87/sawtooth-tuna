import { Module } from '@nestjs/common';
import { IdentityModule } from './identity/identity.module';
import { SawtoothModule } from './sawtooth/sawtooth.module';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        IdentityModule,
        SawtoothModule,
        TestModule
    ]
})
export class CoreModule {}
