import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CompanyEntity } from '../../../../../entity/company.entity';

@Controller('sawtooth/tp/company')
export class CompanyController {

    @Get(':id')
    async getById(@Param('id') id: number): Promise<CompanyEntity> {
        return null;
    }

    @Post()
    @HttpCode(204)
    async create(): Promise<Boolean> {
        return null;
    }
}
