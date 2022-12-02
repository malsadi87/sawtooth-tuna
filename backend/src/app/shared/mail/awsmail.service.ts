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

      Logger.log('**AWS SENDING MAIL**')
      Logger.log(url)
      Logger.log('**TYPES**')
      Logger.log(typeof(email))
      Logger.log(typeof(url))
      Logger.log(typeof(fullName))
      await this.mailerService.sendMail({
          from: "server@paas4chain.xyz",
          to: email,
          subject: 'Welcome to PaaSforChain! PLease, Confirm your Email',
          //template: './confirmation',
          text: "I hope this message gets sent!",
          //context: {
          //  name: fullName,
          //  url: url
          //},
          html: "<p>HTML version of the message</p>"
      });

      return true;
    }

    public async sendResetPasswordEmail(email: string, fullName: string, token: string): Promise<boolean> {
      const url = `${this.configService.get<string>('server.resetPasswordURL')}${token}`;

      await this.mailerService.sendMail({
          to: email,
          subject: 'Takk, for using PaaSforChain! Please follow the instruction, to rest your password',
          //template: './resetPassword',
          text: "I hope this message gets sent!",
          context: {
            name: fullName,
            url: url
          },
      });

      return true;
    }
}
