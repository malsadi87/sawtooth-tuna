import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    await app.init();

  });

  it('/api/v1/identity/signup (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/signup')
      .send({ "fullName": "hermes", "email": "hermes@ntnu.no", "password": "asd123" }).expect(201)
    return response
  });

  it('/api/v1/identity/token (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/token')
      .send({ "email": "hermes@ntnu.no", "password": "asd123" }).expect(201)
    return response
  });

  it('/api/v1/identity/token (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/token')
      .send({ "email": "hermes@ntnu.no", "password": "wrong" }).expect(400)
    return response
  });

  // TODO: SignOut and possibly other endpoints when implemented

  afterAll(done => {
    app.close()
    done()
  })

});


