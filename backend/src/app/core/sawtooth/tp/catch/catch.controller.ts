import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CatchEntity } from '../../../../../entity/catch.entity';
import { CatchCreationDto } from '../../../../utility/dto/tp/catch-creation.dto';
import { CatchService } from './catch.service';

@Controller('sawtooth/tp/catch')
export class CatchController {
    constructor(private readonly catchService: CatchService) {}

    @Get(':id')
    async getById(@Param('id') id: number): Promise<CatchEntity> {
        return await this.catchService.getById(id);
    }

    @Post('addNew')
    async create(@Body() catchPayload: CatchCreationDto): Promise<number> {
        return await this.catchService.addNewCatch(catchPayload);
    }

    @Get('/')
    async getAll(): Promise<CatchEntity[]> {
        return this.catchService.getAll();
    }
}
