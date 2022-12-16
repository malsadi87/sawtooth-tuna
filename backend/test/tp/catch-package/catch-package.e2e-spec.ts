import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('Catch (e2e)', () => {
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
      .send({
        "email": "hermes@ntnu.no",
        "password": "asd123"
      }).expect(201)
    jwtToken = response.body.token
    expect(response.body.token).toBeDefined()
    return response
  });

  it('Can create a catch with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch/addNew')
      .send({
        "pkCatch": "1",
        "updatedDateTime": "2022-09-15T14:37:04.837Z",
        "pkPallet": "1"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Can create another catch with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch/addNew')
      .send({
        "pkCatch": "2",
        "updatedDateTime": "2022-09-15T14:37:04.837Z",
        "pkPallet": "1"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a catch without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch/addNew')
      .send({
        "pkCatch": "1",
        "updatedDateTime": "2022-09-15T14:37:04.837Z",
        "pkPallet": "1"
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a catch with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.pkCatch).toEqual<string>("1")
    expect(response.body.updatedDateTime).toEqual<string>("2022-09-15T14:37:04.837Z")
    expect(response.body.pkPallet).toEqual<string>("1")
    return response
  });

  it('Cant read a catch that doesnt exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)

    return response
  });

  it('Cant read a catch without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch/1')
      .expect(401)
    return response
  });

  it('Can read all catchs with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "pkCatch": "1",
      "updatedDateTime": "2022-09-15T14:37:04.837Z",
      "pkPallet": "1"
    }]))
    return response
  });

  it('Cant read all catchs without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch/')
      .expect(401)
    return response
  });

  it('Cant overwrite a catch with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch/addNew')
      .send({
        "pkCatch": "1",
        "updatedDateTime": "2022-09-15T14:37:04.837Z",
        "pkPallet": "1"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cant create a catch without a related pkPallet', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch/addNew')
      .send({
        "pkCatch": "2",
        "updatedDateTime": "2022-09-15T14:37:04.837Z",
        "pkPallet": "404"
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


