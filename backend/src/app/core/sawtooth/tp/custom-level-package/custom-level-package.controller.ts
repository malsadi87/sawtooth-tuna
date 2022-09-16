import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';
import { CustomPackageCreationDto } from '../../../../utility/dto/tp/custom-package-creation.dto';
import { CustomLevelPackageService } from './custom-level-package.service';

@Controller('sawtooth/tp/custom-package')
export class CustomLevelPackageController {
    constructor(private readonly customLevelPackageService: CustomLevelPackageService) {}

    @Get(':packageId')
    async getById(@Param('packageId') packageId: string): Promise<CustomLevelPackageEntity> {
        return await this.customLevelPackageService.getByConsumerPackageId(packageId);
    }

    @Post('addNew')
    async create(@Body() customePackagePayload: CustomPackageCreationDto): Promise<string> {
        return await this.customLevelPackageService.addNewPackage(customePackagePayload);
    }
}
