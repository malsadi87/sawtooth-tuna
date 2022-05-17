import { Controller, Get } from '@nestjs/common';
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
}
