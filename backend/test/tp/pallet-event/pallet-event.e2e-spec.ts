import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('PalletEvent (e2e)', () => {
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

  it('Can create a pallet-event with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-09-15T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "tilt": 1,
        }),
        "shock": JSON.stringify({
          "vertical": 1,
          "horisontal": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });



  it('Cant create a pallet-event without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-09-15T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "tilt": 1,
        }),
        "shock": JSON.stringify({
          "vertical": 1,
          "horisontal": 1
        })
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a pallet-event with authentication - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/?palletEventId=1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.palletEventId).toEqual<number>(1)
    expect(response.body.eventTime).toEqual<string>("2022-09-15T14:37:04.837Z")
    expect(response.body.temperature).toEqual(JSON.stringify({ "Celsius": 1 }))
    expect(response.body.location).toEqual(JSON.stringify({
      "latitude": 63.40595699218346,
      "longitude": 10.406196141997356,
    }))
    expect(response.body.tilt).toEqual(JSON.stringify({
      "tilt": 1,
    }))
    expect(response.body.shock).toEqual(JSON.stringify({
      "vertical": 1,
      "horisontal": 1
    }))
    return response
  });

  it('Cant read a pallet-event that doesnt exist - known to fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/?palletEventId=404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)

    return response
  });

  it('Cant read a pallet-event without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/?palletEventId=1')
      .expect(401)
    return response
  });

  it('Can read all pallet-events with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "palletEventId": 1,
      "eventTime": "2022-09-15T14:37:04.837Z",
      "palletNum": "1",
      "temperature": JSON.stringify({ "Celsius": 1 }),
      "location": JSON.stringify({
        "latitude": 63.40595699218346,
        "longitude": 10.406196141997356,
      }),
      "tilt": JSON.stringify({
        "tilt": 1,
      }),
      "shock": JSON.stringify({
        "vertical": 1,
        "horisontal": 1
      })
    }]))
    return response
  });

  it('Cant read all pallet-events without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/')
      .expect(401)
    return response
  });

  afterAll(done => {
    app.close()
    done()
  })

});


