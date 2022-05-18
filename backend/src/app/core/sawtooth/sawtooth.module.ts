import { Module } from '@nestjs/common';
import { KeyController } from './key/key.controller';
import { KeyService } from './key/key.service';
import { MetaDataController } from './meta-data/meta-data.controller';
import { MetaDataService } from './meta-data/meta-data.service';
import { TpModule } from './tp/tp.module';
import { HttpModule } from '@nestjs/axios';
import { UtilityService } from './utility/utility.service';

@Module({
    imports: [TpModule, HttpModule],
    controllers: [KeyController, MetaDataController],
    providers: [KeyService, MetaDataService, UtilityService]
})
export class SawtoothModule {}
