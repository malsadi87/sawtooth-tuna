import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('Species (e2e)', () => {
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
    return response
  });

  it('Can create a species with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/species/addNew')
      .send({
        "quantity": 1,
        "species": 1,
        "catchPackageId": "1",
        "launchDateTime": "2022-09-15T14:37:04.837Z"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Can create another species with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/species/addNew')
      .send({
        "quantity": 1,
        "species": 1,
        "catchPackageId": "1",
        "launchDateTime": "2022-09-15T14:37:04.837Z"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a species without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/species/addNew')
      .send({
        "quantity": 1,
        "species": 1,
        "catchPackageId": "1",
        "launchDateTime": "2022-09-15T14:37:04.837Z"
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a species with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/species/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.pkSpecies).toEqual<number>(1)
    expect(response.body.quantity).toEqual<number>(1)
    expect(response.body.species).toEqual<number>(1)
    expect(response.body.catchPackageId).toEqual<string>("1")
    expect(response.body.launchDateTime).toEqual<string>("2022-09-15T14:37:04.837Z")
    return response
  });

  it('Cant read a species that doesnt exist.', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/species/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)
    return response
  });

  it('Cant read a species without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/species/1')
      .expect(401)
    return response
  });

  it('Can read all specieses with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/species/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "pkSpecies": 1,
      "quantity": 1,
      "species": 1,
      "catchPackageId": "1",
      "launchDateTime": "2022-09-15T14:37:04.837Z"
    }]))
    return response
  });

  it('Cant read all specieses without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/species/')
      .expect(401)
    return response
  });

  afterAll(done => {
    app.close()
    done()
  })

});


