import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(
      private readonly mailerService: MailerService,
      private readonly configService: ConfigService
    ) {}
    public async sendUserConfirmation(email: string, fullName: string, token: string): Promise<boolean> {
      const url = `${this.configService.get<string>('server.emailConfirmationURL')}${token}`;
      Logger.log("Email confirmation URL (for dev purpose):", url)
      await this.mailerService.sendMail({
          from: '"no-reply" <server@paas4chain.xyz>',
          to: email,
          subject: 'Welcome to PaaSforChain! PLease, Confirm your Email',
          html: "<p>Hi " + fullName + ", here is your confirmation link for paas4chain: " + url + "</p>"
      });
      return true;
    }

    public async sendResetPasswordEmail(email: string, fullName: string, token: string): Promise<boolean> {
      const url = `${this.configService.get<string>('server.resetPasswordURL')}${token}`;

      await this.mailerService.sendMail({
          from: '"no-reply" <server@paas4chain.xyz>',
          to: email,
          subject: 'Takk, for using PaaSforChain! Please follow the instruction, to rest your password',
          html: "<p>Hi " + fullName + ", here is your reset link for paas4chain: " + url + "</p>"
      });

      return true;
    }
}
