import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('Product (e2e)', () => {
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

  it('Can create a product with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/product/addNew')
      .send({
        "productId": 3,
        "productName": "NameString",
        "productDescription": "DescriptionString",
        "productNum": 1
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a product without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/product/addNew')
      .send({
        "productId": 4,
        "productName": "NameString",
        "productDescription": "DescriptionString",
        "productNum": 3
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a product with authentication - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/product/?productId=3')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.productId).toEqual<number>(3)
    expect(response.body.productName).toEqual<string>("NameString")
    expect(response.body.productDescription).toEqual<string>("DescriptionString")
    expect(response.body.productNum).toEqual<number>(1)
    return response
  });

  it('Cant read a product that doesnt exist - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/product/?productId=404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)
    return response
  });

  it('Cant read a product without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/product/?productId=3')
      .expect(401)
    return response
  });

  it('Can read all products with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/product/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "productId": 3,
      "productName": "NameString",
      "productDescription": "DescriptionString",
      "productNum": 1
    }]))
    return response
  });

  it('Cant read all products without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/product/')
      .expect(401)
    return response
  });

  it('Cant overwrite a product with authentication - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/product/addNew')
      .send({
        "productId": 3,
        "productName": "NameStringChanged",
        "productDescription": "DescriptionStringChanged",
        "productNum": 1
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


