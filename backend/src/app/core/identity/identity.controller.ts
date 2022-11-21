import { Body, Controller, Delete, Get, Param, Post, Redirect, ValidationPipe } from '@nestjs/common';
import { ConfirmEmailDto } from 'src/app/utility/dto/confirmEmail.dto';
import { ResetPasswordDto } from 'src/app/utility/dto/resetPassword.dto';
import { ResetPasswordConfirmationDto } from 'src/app/utility/dto/resetPasswordConfirmation.dto';
import { UsersService } from '../../feature/users/users.service';
import { AllowAnonymous } from '../../utility/decorator/allowAnonymous.decorator';
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

        // Send verification email
        await this.identityService.sendEmailVerification(res.user.id, res.user.email, res.user.fullName);

        return { id: res.user.id };
	}

    @AllowAnonymous()
    @Get('/confirm/:token')
    @Redirect('http://localhost:3000/auth/login', 302) //Should be come from config, dont know how(design choice), will decide later
    public async confirm(@Param() params: ConfirmEmailDto): Promise<boolean> {
        // validate the token
        const email = await this.identityService.validateSecondaryToken(params.token);

        // Update DB for email confirmation
        const user = await this.usersService.updateUserEmailConfirmation(email, true);
        
        // // Generate a new Key pair
        const { publicKey, privateKey } = this.blockChainKeyService.createKeyPair();

        // // Save the key pair to blockchaininfor table
        await this.usersService.updateUserBlockChainInfo(user, publicKey, privateKey);

        return true;
    }

    @AllowAnonymous()
    @Post('/resetPassword')
    public async resetPassword(@Param() params: ResetPasswordDto): Promise<boolean> {
        // Validate if email is valid
        const validUser = await this.usersService.validateExistingEmail(params.email);

        // Generate a token to validate user, while submit request to rest password
        // User will be receive an email to rest password
        return await this.identityService.resetPassword(validUser.id, validUser.email, validUser.fullName);
    }

    @AllowAnonymous()
    @Post('/resetPasswordConfirmation')
    public async resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto): Promise<boolean> {
        // validate the token
        const email = await this.identityService.validateSecondaryToken(resetPasswordConfirmationDto.token);

        // Set the new Password
        const user = await this.usersService.resetPassword(email, resetPasswordConfirmationDto.newPassword);

        return true;
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
