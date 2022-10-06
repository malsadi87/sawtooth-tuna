import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';

describe('Trip (e2e)', () => {
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
    return response
  });

  it('Can create a trip with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/trip/addNew')
      .send({
        "tripNo": 123,
        "tripWithinYearNo": 12,
        "vesselName": "Test Vessel",
        "departureDate": "2022-09-15T14:37:04.837Z",
        "departurePort": "trondheim",
        "landingDate": "2022-09-15T14:37:04.837Z",
        "landingPort": "Hamar"         
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
      //TODO: Check if the data was stored in the database and on the blokchain.
    return response
  });



  it('Cant create a trip without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/trip/addNew')
      .send({
        "tripNo": 123,
        "tripWithinYearNo": 12,
        "vesselName": "Test Vessel",
        "departureDate": "2022-09-15T14:37:04.837Z",
        "departurePort": "trondheim",
        "landingDate": "2022-09-15T14:37:04.837Z",
        "landingPort": "Hamar"         
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Cant create a trip with conflicting departure and landing', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/trip/addNew')
      .send({
        "tripNo": 1234,
        "tripWithinYearNo": 12,
        "vesselName": "Test Vessel",
        "departureDate": "2022-10-15T14:37:04.837Z",
        "departurePort": "trondheim",
        "landingDate": "2022-09-15T14:37:04.837Z",
        "landingPort": "Hamar"         
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Can read a trip with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/trip/?tripNo=1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.tripNo === 1)
    expect(response.body.tripWithinYearNo === 12)
    expect(response.body.vesselName === "Test Vessel")
    expect(response.body.departureDate === "2022-09-15T14:37:04.837Z")
    expect(response.body.departurePort === "trondheim")
    expect(response.body.landingDate === "2022-09-15T14:37:04.837Z")
    expect(response.body.landingPort === "Hamar")

    return response
  });

  it('Cant read a trip without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/trip/?tripNo=1')
      .expect(401)
    return response
  });

  it('Can read all trips with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/trip/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "tripNo": 123,
      "tripWithinYearNo": 12,
      "vesselName": "Test Vessel",
      "departureDate": "2022-09-15T14:37:04.837Z",
      "departurePort": "trondheim",
      "landingDate": "2022-09-15T14:37:04.837Z",
      "landingPort": "Hamar"         
    }]))
    return response
  });

  it('Cant read all trips without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/trip/')
      .expect(401)
    return response
  });

  it('Cant overwrite a trip with authentication - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/trip/addNew')
      .send({
        "tripNo": 123,
        "tripWithinYearNo": 12,
        "vesselName": "Test Vessel",
        "departureDate": "2022-09-15T14:37:04.837Z",
        "departurePort": "trondheim",
        "landingDate": "2022-09-15T14:37:04.837Z",
        "landingPort": "Hamar"         
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
      //TODO: This test is known to fail because the backend does not prevent overwrite.
    return response
  });

  afterAll(done => {
    app.close()
    done()
  })

});


