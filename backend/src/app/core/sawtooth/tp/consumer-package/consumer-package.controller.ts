import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CatchEntity } from 'src/entity/catch.entity';
import { ConsumerPackageEntity } from '../../../../../entity/consumerPackage.entity';
import { ConsumerPackageCreationDto } from '../../../../utility/dto/tp/consumer-package-creation.dto';
import { CustomLevelPackageService } from './consumer-package.service';

@Controller('sawtooth/tp/custom-package')
export class CustomLevelPackageController {
    constructor(private readonly customLevelPackageService: CustomLevelPackageService) {}

    @Get(':pkConsumerPackage')
    async getById(@Param('pkConsumerPackage') pkConsumerPackage: number): Promise<ConsumerPackageEntity> {
        return await this.customLevelPackageService.getByPkConsumerPackage(pkConsumerPackage);
    }

    @Post('addNew')
    async create(@Body() customePackagePayload: ConsumerPackageCreationDto): Promise<number> {
        return await this.customLevelPackageService.addNewPackage(customePackagePayload);
    }

    @Get('/')
    async getAll(): Promise<ConsumerPackageEntity[]> {
        return this.customLevelPackageService.getAll();
    }

    // TODO: Get all data related to consumer package.
    //@Get('getData/:pkConsumerPackage')
    //async getData(@Param('pkConsumerPackage') pkConsumerPackage: string): Promise<{ 
    //  customLevelPackage: ConsumerPackageEntity,
    //  catch: CatchEntity 
    //}> {
    //    return await this.customLevelPackageService.getData(pkConsumerPackage);
    //}
}
