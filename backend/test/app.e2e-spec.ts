import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    console.log(`Current ENVIRONMENT IS ----> ${process.env.NODE_ENV}`);
    process.env.NODE_ENV = "dev"
    process.env.DATABASE_USER = "root"
    process.env.DATABASE_PW = "root"
    process.env.DATABASE_HOST = "tunachain-db"
    process.env.JWT_SECRET = "123456789101112"
    process.env.DATABASE_PORT = "5432"
    console.log(`Current ENVIRONMENT IS ----> ${process.env.NODE_ENV}`);
    console.log(`Current DATABASE HOST IS ----> ${process.env.DATABASE_HOST}`);

    try {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    }
    catch(e){
      console.log("++++++++++")
      console.log(e)
      console.log("++++++++++")
    }


  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
