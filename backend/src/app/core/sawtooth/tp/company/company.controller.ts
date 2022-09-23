import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CompanyEntity } from '../../../../../entity/company.entity';
import { CompanyCreationDto } from '../../../../utility/dto/tp/company-creation.dto';
import { CompanyService } from './company.service';

@Controller('sawtooth/tp/company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get(':id')
    async getById(@Param('id') id: number): Promise<CompanyEntity> {
        return await this.companyService.getById(id);
    }

    @Post('addNew')
    async create(@Body() companyPayload: CompanyCreationDto): Promise<number> {
        return await this.companyService.addNewCompany(companyPayload);
    }
    
    @Get('/')
    async getAll(): Promise<CompanyEntity[]> {
        return this.companyService.getAll();
    }
}
