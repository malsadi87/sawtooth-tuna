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
    public async signIn(@Body(ValidationPipe) authCredential: AuthCredential): Promise<{ token: string }> {
        const token = await this.identityService.validateCredential(authCredential);
        return { token: token };
    }

    @AllowAnonymous()
    @Post('/signup')
	public async signUp(@Body() userAndPermissionDto: UserCreationDto): Promise<any> {
        // Create the user
		const res = await this.usersService.addUser(userAndPermissionDto);

        // Generate a new Key pair
        const { publicKey, privateKey } = this.blockChainKeyService.createKeyPair();

        // Save the key pair to blockchaininfor table
        const user = await this.usersService.updateUserBlockChainInfo(res.user, publicKey, privateKey);
		return { id: user.id };
	}

    @Get('/signOut')
    public async signOut(): Promise<Boolean> {
        return null;
    }

    @Post('/addClaimsAndRoles')
    public async addClaimsAndRoles(): Promise<any> {
        return null;
    }

    @Delete('/deleteClaimsAndRoles')
    public async deleteClaimsAndRoles(): Promise<any> {
        return null;
    }

    @Delete('/delete')
    public async deleteUser(): Promise<any> {
        return null;
    }
}
