import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeyController } from './key/key.controller';
import { KeyService } from './key/key.service';
import { MetaDataController } from './meta-data/meta-data.controller';
import { MetaDataService } from './meta-data/meta-data.service';
import { TpModule } from './tp/tp.module';
import { UtilityModule } from './sawtooth-utility/sawtooth-utility.module';

@Module({
    imports: [
        TpModule,
        UtilityModule,
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
