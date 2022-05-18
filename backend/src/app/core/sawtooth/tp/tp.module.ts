import { Module } from '@nestjs/common';
import { UtilityService } from '../utility/utility.service';
import { FishController } from './fish/fish.controller';
import { FishService } from './fish/fish.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [FishController],
    providers: [FishService, UtilityService]
})
export class TpModule {}
