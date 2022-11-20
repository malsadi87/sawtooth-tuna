import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const serverConfig = config.get('server');
  const NODE_ENV = config.get('env.NODE_ENV')


  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: serverConfig.cors.split(';') });
  await app.listen(serverConfig.port);

  Logger.log(`Current ENVIRONMENT IS ----> ${NODE_ENV}`);
  Logger.log(`Server is running on port ${serverConfig.port}`, "Bootstrap");
}

bootstrap();
