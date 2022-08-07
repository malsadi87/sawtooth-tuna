import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AllowAnonymous } from '../../utility/decorator/AllowAnonymous.decorator';
import { AuthCredential } from '../../utility/dto/authCredential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @AllowAnonymous()
    @Post('/SignIn')
    SignIn(@Body(ValidationPipe) authCredential: AuthCredential): Promise<{ accessToken: string }> {
        const res = this.authService.validateCredential(authCredential);
        return res;
    }
}
