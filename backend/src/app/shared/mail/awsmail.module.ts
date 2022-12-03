import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import * as AWS from "@aws-sdk/client-ses";


@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const { AWS_SES_REGION, 
                  AWS_SES_ACCESS_KEY,
                  AWS_SES_KEY_SECRET,
                } = configService.get('awsEmail');
                const ses = new AWS.SES({
                  region: AWS_SES_REGION,
                  credentials: {
                    accessKeyId: AWS_SES_ACCESS_KEY,
                    secretAccessKey: AWS_SES_KEY_SECRET
                  }
                });
                return {
                    transport: {
                      SES: {
                        ses: ses,
                        aws: AWS,
                      },
                      debug: true,
                    },
                    defaults: {
                      from: '"no-reply" <server@paas4chain.xyz>',
                    },
                }
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
