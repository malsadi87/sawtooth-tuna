import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CatchPackageEntity } from '../../../../../entity/catchPackage.entity';
import { CatchPackageCreationDto } from '../../../../utility/dto/tp/catch-package-creation.dto';
import { CatchPackageService } from './catch-package.service';

@Controller('sawtooth/tp/catch-package')
export class CatchPackageController {
    constructor(private readonly catchPackageService: CatchPackageService) {}

    @Get(':id')
    async getById(@Param('id') id: string): Promise<CatchPackageEntity> {
        return await this.catchPackageService.getById(id);
    }

    @Post('addNew')
    async create(@Body() catchPackagePayload: CatchPackageCreationDto): Promise<string> {
        return await this.catchPackageService.addNewCatchPackage(catchPackagePayload);
    }
}
