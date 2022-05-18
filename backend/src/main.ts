import 'dotenv/config'; //By doing this, this will call the config method of `dotenv` and load the .env(file)/environment variables 
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { getProjectConfig } from './app/utility/methods/helper.methods';

async function bootstrap() {
  const port = getProjectConfig('server').port;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(port);

  Logger.log(`Current ENVIRONMENT IS ----> ${process.env.NODE_ENV}`);
  Logger.log(`Server is running on port ${port}`, "Bootstrap");
}

bootstrap();
