import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';

@Controller('sawtooth/catch-package')
export class CatchPackageController {

    @Get(':id')
    async getById(@Param('id') id: number): Promise<CatchPackageEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
