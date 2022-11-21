import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
      private readonly mailerService: MailerService,
      private readonly configService: ConfigService
    ) {}

    public async sendUserConfirmation(email: string, fullName: string, token: string): Promise<boolean> {
      const url = `${this.configService.get<string>('server.emailConfirmationURL')}${token}`;

      await this.mailerService.sendMail({
          to: email,
          subject: 'Welcome to PaaSforChain! PLease, Confirm your Email',
          template: './confirmation',
          context: {
            name: fullName,
            url: url
          },
      });

      return true;
    }

    public async sendResetPasswordEmail(email: string, fullName: string, token: string): Promise<boolean> {
      const url = `${this.configService.get<string>('server.resetPasswordURL')}${token}`;

      await this.mailerService.sendMail({
          to: email,
          subject: 'Takk, for using PaaSforChain! Please follow the instruction, to rest your password',
          template: './resetPassword',
          context: {
            name: fullName,
            url: url
          },
      });

      return true;
    }
}
