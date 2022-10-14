import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('CatchPackage (e2e)', () => {
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

  it('Can create a catch-package with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch-package/addNew')
      .send({
        "catchPackageId": "1",
        "packingDate": "2022-09-15T14:37:04.837Z",
        "palletNum": "1"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });



  it('Cant create a catch-package without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch-package/addNew')
      .send({
        "catchPackageId": "1",
        "packingDate": "2022-09-15T14:37:04.837Z",
        "palletNum": "1"
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a catch-package with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch-package/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.catchPackageId).toEqual<string>("1")
    expect(response.body.packingDate).toEqual<string>("2022-09-15T14:37:04.837Z")
    expect(response.body.palletNum).toEqual<string>("1")
    return response
  });

  it('Cant read a catch-package that doesnt exist - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch-package/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)

    return response
  });

  it('Cant read a catch-package without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch-package/1')
      .expect(401)
    return response
  });

  it('Can read all catch-packages with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch-package/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "catchPackageId": "1",
      "packingDate": "2022-09-15T14:37:04.837Z",
      "palletNum": "1"
    }]))
    return response
  });

  it('Cant read all catch-packages without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/catch-package/')
      .expect(401)
    return response
  });

  it('Cant overwrite a catch-package with authentication - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch-package/addNew')
      .send({
        "catchPackageId": "1",
        "packingDate": "2022-09-15T14:37:04.837Z",
        "palletNum": "1"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cant create a catch-package without a related palletNum - fails because of lacking error handling', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/catch-package/addNew')
      .send({
        "catchPackageId": "2",
        "packingDate": "2022-09-15T14:37:04.837Z",
        "palletNum": "404"
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


