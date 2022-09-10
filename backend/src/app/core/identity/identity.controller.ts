import { Body, Controller, Delete, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../feature/users/users.service';
import { AllowAnonymous } from '../../utility/decorator/AllowAnonymous.decorator';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { UserCreationDto } from '../../utility/dto/user-creation.dto';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
    constructor(
        private identityService: IdentityService,
        private usersService: UsersService
    ) { }

    @AllowAnonymous()
    @Post('/token')
    SignIn(@Body(ValidationPipe) authCredential: AuthCredential): Promise<{ accessToken: string }> {
        const res = this.identityService.validateCredential(authCredential);
        return res;
    }

    @Post('/signup')
	async signUp(@Body() userAndPermissionDto: UserCreationDto): Promise<any> {
		const res = await this.usersService.addUser(userAndPermissionDto);
		return { id: res.user.id };
	}

    @Get('/signOut')
    async signOut(): Promise<Boolean> {
        return null;
    }

    @Post('/signup')
    async changePassword(): Promise<any> {
        return null;
    }

    @Post('/addClaimsAndRoles')
    async addClaimsAndRoles(): Promise<any> {
        return null;
    }

    @Delete('/deleteClaimsAndRoles')
    async deleteClaimsAndRoles(): Promise<any> {
        return null;
    }

    @Delete('/delete')
    async deleteUser(): Promise<any> {
        return null;
    }
}
