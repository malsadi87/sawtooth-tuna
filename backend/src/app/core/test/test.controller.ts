import { Controller, Get, Param } from '@nestjs/common';
import { AllowAnonymous } from '../../utility/decorator/AllowAnonymous.decorator';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @AllowAnonymous()
    @Get('/')
    Get(): string {
        return "Hello world!";
    }

    @AllowAnonymous()
    @Get('/url/:id')
    GetURl(@Param('id') id: number): string {
        return id.toString();
    }
}
