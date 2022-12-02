import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const { host, secure, username, password, from } = configService.get('email');
                // console.log(join(__dirname.split('/src')[0], '/emailTemplates'));

                return {
                    transport: {
                        host: host,
                        secure: Boolean(secure),
                        auth: {
                            user: username,
                            pass: password
                        }
                    },
                    defaults: {
                        from: from
                    },
                    template: {
                        dir: join(__dirname.split('/src')[0], '/templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        }
                    }
                }
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
