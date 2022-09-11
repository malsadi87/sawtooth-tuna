import { Body, Controller, Delete, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../feature/users/users.service';
import { AllowAnonymous } from '../../utility/decorator/AllowAnonymous.decorator';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { UserCreationDto } from '../../utility/dto/user-creation.dto';
import { KeyService } from '../sawtooth/key/key.service';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
    constructor(
        private readonly identityService: IdentityService,
        private readonly usersService: UsersService,
        private readonly blockChainKeyService: KeyService
    ) { }

    @AllowAnonymous()
    @Post('/token')
    SignIn(@Body(ValidationPipe) authCredential: AuthCredential): Promise<{ accessToken: string }> {
        const res = this.identityService.validateCredential(authCredential);
        return res;
    }

    @AllowAnonymous()
    @Post('/signup')
	async signUp(@Body() userAndPermissionDto: UserCreationDto): Promise<any> {
        // Create the user
		const res = await this.usersService.addUser(userAndPermissionDto);

        // Generate a new Key pair
        const { publicKey, privateKey } = this.blockChainKeyService.createKeyPair();

        // Save the key pair to blockchaininfor table
        const user = await this.usersService.updateUserBlockChainInfo(res.user, publicKey, privateKey);
		return { id: user.id };
	}

    @Get('/signOut')
    async signOut(): Promise<Boolean> {
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
