import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
//import aws from 'aws-sdk'
import * as AWS from 'aws-sdk';
//import { fromEnv } from "@aws-sdk/credential-providers"; // ES6 import
//import aws from "@aws-sdk/client-ses";
//import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

const upperCaseFn = (name: string) => {
  return name.toUpperCase();
};

//awsEmail:
//AWS_SES_REGION: "eu-north-1"
//AWS_SES_ACCESS_KEY: "AKIA2NK6FFFGKYNTGBF2"
//AWS_SES_KEY_SECRET: "BPatce0UMqn5tHNEjk0lckPWPgcupS99NRRu4C4lG+Pj"
//MAIL_HOST: "email-smtp.eu-north-1.amazonaws.com"
//MAIL_PORT: "25"
//MAIL_USERNAME: "ses-smtp-user.20221129-115544"
//MAIL_PASSWORD: ""
//MAIL_FROM_NAME: "server@paas4chain.xyz"
//MAIL_FROM_ADDRESS: '"No Reply" <server@paas4chain.xyz>'

//const ses = new AWS.SES({
//  region: "eu-north-1",
//  apiVersion: "2010-12-01",
//});

//const transporter = MailerModule.createTransport({ SES: ses, AWS })

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const { AWS_SES_REGION, 
                  AWS_SES_ACCESS_KEY,
                  AWS_SES_KEY_SECRET,
                  MAIL_HOST,
                  MAIL_PORT,
                  MAIL_USERNAME,
                  MAIL_PASSWORD,
                  MAIL_FROM_NAME,
                  MAIL_FROM_ADDRESS,} = configService.get('awsEmail');
                // console.log(join(__dirname.split('/src')[0], '/emailTemplates'));

                return {
                    transport: {
                      SES: {ses: new AWS.SES({
                        apiVersion: '2010-12-01',
                        region: AWS_SES_REGION,
                        accessKeyId: AWS_SES_ACCESS_KEY,
                        secretAccessKey: AWS_SES_KEY_SECRET,
                      }),
                      aws: AWS,
                      },
                      //host: MAIL_HOST,
                      //port: MAIL_PORT,
                      //secure: false,
                      //ignoreTLS:true,
                      //requireTLS:false,
                      //auth: {
                      //  user: MAIL_USERNAME,
                      //  pass: MAIL_PASSWORD,
                      //},
                      debug: true
                    },
                    defaults: {
                      from: '"no-reply" <server@paas4chain.xyz>',
                      //from: MAIL_FROM_ADDRESS
                    },
                    //template: {
                    //    dir: join(__dirname.split('/src')[0], '/emailTemplates'),
                    //    adapter: new HandlebarsAdapter(),
                    //    options: {
                    //        strict: true,
                    //    }
                    //}
                }
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
