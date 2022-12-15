import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('Pallet (e2e)', () => {
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

  it('Can create a pallet with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet/addNew')
      .send({
        "palletNum": "1",
        "productNum": 1,
        "supplierId": "Supplier",
        "palletWeight": 1,
        "pkTrip": 123
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Can create another pallet with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet/addNew')
      .send({
        "palletNum": "2",
        "productNum": 1,
        "supplierId": "Supplier",
        "palletWeight": 1,
        "pkTrip": 123
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a pallet without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet/addNew')
      .send({
        "palletNum": "1",
        "productNum": 1,
        "supplierId": "Supplier",
        "palletWeight": 1,
        "pkTrip": 123
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a pallet with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.palletNum).toEqual<string>("1")
    expect(response.body.productNum).toEqual<number>(1)
    expect(response.body.supplierId).toEqual<string>("Supplier")
    expect(response.body.palletWeight).toEqual<number>(1.0000)
    expect(response.body.pkTrip).toEqual<number>(123)
    return response
  });

  it('Cant read a pallet that doesnt exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)

    return response
  });

  it('Cant read a pallet without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet/1')
      .expect(401)
    return response
  });

  it('Can read all pallets with authentication.', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "palletNum": "1",
      "productNum": 1,
      "supplierId": "Supplier",
      "palletWeight": 1.0000,
      "pkTrip": 123
    }]))
    return response
  });

  it('Cant read all pallets without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet/')
      .expect(401)
    return response
  });

  it('Cant overwrite a pallet with authentication.', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet/addNew')
      .send({
        "palletNum": "1",
        "productNum": 1,
        "supplierId": "Supplier",
        "palletWeight": 5,
        "pkTrip": 123
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cant create a pallet without a related pkTrip.', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet/addNew')
      .send({
        "palletNum": "1",
        "productNum": 1,
        "supplierId": "Supplier",
        "palletWeight": 1,
        "pkTrip": 404
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


