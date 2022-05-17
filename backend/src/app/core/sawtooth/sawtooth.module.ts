import { Module } from '@nestjs/common';
import { KeyController } from './key/key.controller';
import { KeyService } from './key/key.service';
import { MetaDataController } from './meta-data/meta-data.controller';
import { MetaDataService } from './meta-data/meta-data.service';
import { TpModule } from './tp/tp.module';

@Module({
    imports: [TpModule],
    controllers: [KeyController, MetaDataController],
    providers: [KeyService, MetaDataService]
})
export class SawtoothModule {}
