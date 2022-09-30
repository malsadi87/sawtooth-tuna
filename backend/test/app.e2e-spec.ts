import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {

    console.log(`Current ENVIRONMENT IS ----> ${process.env.NODE_ENV}`);
    console.log(`Current DATABASE HOST IS ----> ${process.env.DATABASE_HOST}`);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    await app.init();

  });

// unit tests for env file
  it('should have a node env', () => {
      expect(process.env.NODE_ENV).toBeDefined();
  });
  it('should have a database host', () => {
      expect(process.env.DATABASE_HOST).toBeDefined();
  });

  it('/api/v1/test (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/test')
      .expect(200)
      .expect('Hello world!');
  });

  afterEach(done => {
    app.close()
    done()
  })

});


