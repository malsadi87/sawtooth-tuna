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

  it('Can signup a new user. Remember to clear the database for this to pass (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/signup')
      .send({
        "fullName": "hermes",
        "email": "hermes@ntnu.no",
        "password": "asd123"
      })
      .expect(201)
    return response
    // TODO: Check if user exists
  });

  it('Cant signup with bad email', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/signup')
      .send({
        "fullName": "hermes",
        "email": "hermesATntnu.no",
        "password": "asd123"
      })
      .expect(400)
      expect(response.body.token).not.toBeDefined()
    return response
  });

  it('Can login with valid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/token')
      .send({
        "email": "hermes@ntnu.no",
        "password": "asd123"
      })
      .expect(201)
    return response
  });

  it('Cant login with invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/token')
      .send({
        "email": "hermes@ntnu.no",
        "password": "wrong"
      })
      .expect(401)
      expect(response.body.token).not.toBeDefined()
    return response
  });

  // TODO: SignOut and possibly other endpoints when implemented

  afterAll(done => {
    app.close()
    done()
  })

});


