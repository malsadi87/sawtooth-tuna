import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeyController } from './key/key.controller';
import { KeyService } from './key/key.service';
import { MetaDataController } from './meta-data/meta-data.controller';
import { MetaDataService } from './meta-data/meta-data.service';
import { SawtoothUtilityModule } from './sawtooth-utility/sawtooth-utility.module';
import { TpModule } from './tp/tp.module';

@Module({
    imports: [
        TpModule,
        SawtoothUtilityModule,
        HttpModule
    ],
    controllers: [
        KeyController, 
        MetaDataController
    ],
    providers: [
        KeyService,
        MetaDataService
    ],
    exports: [KeyService]
})
export class SawtoothModule {}
