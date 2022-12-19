import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('ConsumerPackage (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    await app.init();

  });

  it('Can authenticate', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/identity/token')
      .send({ "email": "hermes@ntnu.no", "password": "asd123" }).expect(201)
    jwtToken = response.body.token
    console.log(jwtToken)
    return response
  });

  it('Can create a custom-package with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/custom-package/addNew')
      .send({
        "pkConsumerPackage": "1",
        "fkPallet": "1",
        "packingDateTime": "2022-09-15T14:37:04.837Z",
        "agent": 1
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Can create another custom-package with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/custom-package/addNew')
      .send({
        "pkConsumerPackage": "2",
        "fkPallet": "1",
        "packingDateTime": "2022-09-15T14:37:04.837Z",
        "agent": 1
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a custom-package without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/custom-package/addNew')
      .send({
        "pkConsumerPackage": "1",
        "fkPallet": "1",
        "packingDateTime": "2022-09-15T14:37:04.837Z",
        "agent": 1
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a custom-package with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/custom-package/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.pkConsumerPackage).toEqual<string>("1")
    expect(response.body.fkPallet).toEqual<string>("1")
    expect(response.body.packingDateTime).toEqual<string>("2022-09-15T14:37:04.837Z")
    expect(response.body.agent).toEqual<number>(1)
    return response
  });

  it('Cant read a custom-package that doesnt exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/custom-package/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)
    return response
  });

  it('Cant read a custom-package without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/custom-package/1')
      .expect(401)
    return response
  });

  it('Can read all custom-packagees with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/custom-package/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "pkConsumerPackage": "1",
      "fkPallet": "1",
      "packingDateTime": "2022-09-15T14:37:04.837Z",
      "agent": 1
    }]))
    return response
  });

  // TODO: This test should check for more values.
  it('Can read all custom-package data with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/custom-package/getData/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.customLevelPackage).toEqual({
      "pkConsumerPackage": "1",
      "fkPallet": "1",
      "packingDateTime": "2022-09-15T14:37:04.837Z",
      "agent": 1
    })
    return response
  });

  it('Cant read all custom-packagees without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/custom-package/')
      .expect(401)
    return response
  });

  it('Cant overwrite a custom-package with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/custom-package/addNew')
      .send({
        "pkConsumerPackage": "1",
        "fkPallet": "1",
        "packingDateTime": "2021-01-15T14:37:20.837Z",
        "agent": 1
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cant create a custom-package without a related agent - fails because of lacking error handling', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/custom-package/addNew')
      .send({
        "pkConsumerPackage": "1",
        "fkPallet": "1",
        "packingDateTime": "2021-01-15T14:37:20.837Z",
        "agent": 404
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cant create a custom-package without a related fkPallet - fails because of lacking error handling', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/custom-package/addNew')
      .send({
        "pkConsumerPackage": "1",
        "fkPallet": "404",
        "packingDateTime": "2021-01-15T14:37:20.837Z",
        "agent": 1
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  afterAll(done => {
    app.close()
    done()
  })

});


