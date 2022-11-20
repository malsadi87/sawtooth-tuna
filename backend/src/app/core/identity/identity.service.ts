import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/app/shared/mail/mail.service';
import { UsersService } from '../../feature/users/users.service';
import { AuthCredential } from '../../utility/dto/auth-credential.dto';
import { JwtPayload } from '../../utility/vm/jwtPayload.vm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentityService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService
    ) { }

    async validateCredential(authCredential: AuthCredential): Promise<string> {
        const isValidate = await this.usersService.validateCredential(authCredential);
        if (!isValidate) {
            throw new BadRequestException('Invalid Credential! Please register first');
        }
        
        var user = await this.usersService.getUserByEmail(authCredential.email);
        const payload: JwtPayload = JSON.parse(JSON.stringify({ 
            email: authCredential.email, 
            id: user.id,
            fullName: user.fullName,
            token_type: 'Bearer'
        }));
        return this.jwtService.sign(payload);
    }

    public async sendEmailVerification(userId: string, email: string, fullName: string): Promise<boolean> {
        const token = this.jwtService.sign({ userId, email, fullName }, {
          secret: this.configService.get('env.JWT_SECONDARY_TOKEN_SECRET'),
          expiresIn: this.configService.get('jwt-config.verificationTokenExpiresIn')
        });

        return this.mailService.sendUserConfirmation(email, fullName, token);
    }

    public async resetPassword(userId: string, email: string, fullName: string): Promise<boolean> {
        const token = this.jwtService.sign({ userId, email, fullName }, {
            secret: this.configService.get('env.JWT_SECONDARY_TOKEN_SECRET'),
            expiresIn: this.configService.get('jwt-config.resetPasswordTokenExpiresIn')
        });

        return this.mailService.sendResetPasswordEmail(email, fullName, token);
    }

    public async validateSecondaryToken(token: string): Promise<string> {
        try {
          const payload = await this.jwtService.verify(token, {
            secret: this.configService.get('env.JWT_SECONDARY_TOKEN_SECRET'),
          });
     
          if (typeof payload === 'object' && 'email' in payload)
            return payload.email;

          throw new BadRequestException();
        } catch (error) {
          if (error?.name === 'TokenExpiredError') {
            throw new BadRequestException('Email confirmation token expired');
          }
          throw new BadRequestException('Bad confirmation token');
        }
      }
}
