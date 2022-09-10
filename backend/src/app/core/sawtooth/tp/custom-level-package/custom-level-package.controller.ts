import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CustomLevelPackageEntity } from '../../../../../entity/customLevelPackage.entity';

@Controller('sawtooth/tp/custom-package')
export class CustomLevelPackageController {

    @Get(':id')
    async getById(@Param('id') id: number): Promise<CustomLevelPackageEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
