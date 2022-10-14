import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('Company (e2e)', () => {
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

  it('Can create a company with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/company/addNew')
      .send({
        "companyName": "Company Name",
        "companyAddress": "AddressString",
        "contactInfo": "ContactString"
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a company without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/company/addNew')
      .send({
        "companyName": "Company Name",
        "companyAddress": "AddressString",
        "contactInfo": "ContactString"
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a company with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/company/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.companyId).toEqual<number>(1)
    expect(response.body.companyName).toEqual<string>("Company Name")
    expect(response.body.companyAddress).toEqual<string>("AddressString")
    expect(response.body.contactInfo).toEqual<string>("ContactString")
    return response
  });

  it('Cant read a company that doesnt exist - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/company/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)
    return response
  });

  it('Cant read a company without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/company/1')
      .expect(401)
    return response
  });

  it('Can read all companys with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/company/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "companyId": 1,
      "companyName": "Company Name",
      "companyAddress": "AddressString",
      "contactInfo": "ContactString"
    }]))
    return response
  });

  it('Cant read all companys without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/company/')
      .expect(401)
    return response
  });

  afterAll(done => {
    app.close()
    done()
  })

});


