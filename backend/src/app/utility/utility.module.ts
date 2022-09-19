import { Module } from '@nestjs/common';
import { SawtoothUtilityModule } from '../core/sawtooth/sawtooth-utility/sawtooth-utility.module';
import { ChainEntitySubscriber } from './subscriber/chainEntity.subscriber';

@Module({
    imports: [SawtoothUtilityModule],
    providers: [ChainEntitySubscriber]
})
export class UtilityModule {}
