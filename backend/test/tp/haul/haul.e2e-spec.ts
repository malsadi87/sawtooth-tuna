import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';

describe('Haul (e2e)', () => {
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

  it('Can create a haul with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/haul/addNew')
      .send({
        "launchDateTime": "2022-08-15T22:00:03.092Z",
        "launchPosition": "PositionOfLaunch1",
        "launchLatitude": 63.40595699218346,
        "launchLongitude": 10.406196141997356,
        "haulDateTime": "2022-09-15T14:37:04.837Z",
        "haulPosition": "PositionOfHaul1",
        "haulLatitude": 63.40595699218346,
        "haulLongitude": 10.406196141997356,
        "tripNo": 123
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Can create another haul with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/haul/addNew')
      .send({
        "launchDateTime": "2022-08-15T22:00:03.092Z",
        "launchPosition": "PositionOfLaunch1",
        "launchLatitude": 63.40595699218346,
        "launchLongitude": 10.406196141997356,
        "haulDateTime": "2022-09-15T14:37:04.837Z",
        "haulPosition": "PositionOfHaul1",
        "haulLatitude": 63.40595699218346,
        "haulLongitude": 10.406196141997356,
        "tripNo": 123
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Cant create a haul without authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/haul/addNew')
      .send({
        "launchDateTime": "2022-08-15T22:00:03.092Z",
        "launchPosition": "dasdas",
        "launchLatitude": 63.40595699218346,
        "launchLongitude": 10.406196141997356,
        "haulDateTime": "2022-09-15T14:37:04.837Z",
        "haulPosition": "asdas",
        "haulLatitude": 63.40595699218346,
        "haulLongitude": 10.406196141997356,
        "tripNo": 123
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Cant create a haul with conflicting launch and haul known to fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/haul/addNew')
      .send({
        "launchDateTime": "2022-09-15T22:00:03.092Z",
        "launchPosition": "dasdas",
        "launchLatitude": 63.40595699218346,
        "launchLongitude": 10.406196141997356,
        "haulDateTime": "2022-08-15T14:37:04.837Z",
        "haulPosition": "asdas",
        "haulLatitude": 63.40595699218346,
        "haulLongitude": 10.406196141997356,
        "tripNo": 123
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Can read a haul with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/haul/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.haulId).toEqual<number>(1)
    expect(response.body.launchDateTime).toEqual<string>("2022-08-15T22:00:03.092Z")
    expect(response.body.launchPosition).toEqual<string>("PositionOfLaunch1")
    expect(response.body.launchLatitude).toEqual<number>(63.40595699218346)
    expect(response.body.launchLongitude).toEqual<number>(10.406196141997356)
    expect(response.body.haulDateTime).toEqual<string>("2022-09-15T14:37:04.837Z")
    expect(response.body.haulPosition).toEqual<string>("PositionOfHaul1")
    expect(response.body.haulLatitude).toEqual<number>(63.40595699218346,)
    expect(response.body.haulLongitude).toEqual<number>(10.406196141997356)
    expect(response.body.tripNo).toEqual<number>(123)
    return response
  });

  it('Cant read a haul that doesnt exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/haul/404')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)
    return response
  });

  it('Cant read a haul without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/haul/1')
      .expect(401)
    return response
  });

  it('Can read all hauls with authentication.', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/haul/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "haulId": 1,
      "launchDateTime": "2022-08-15T22:00:03.092Z",
      "launchPosition": "PositionOfLaunch1",
      "launchLatitude": 63.40595699218346,
      "launchLongitude": 10.406196141997356,
      "haulDateTime": "2022-09-15T14:37:04.837Z",
      "haulPosition": "PositionOfHaul1",
      "haulLatitude": 63.40595699218346,
      "haulLongitude": 10.406196141997356,
      "tripNo": 123
    }]))
    return response
  });

  it('Cant read all hauls without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/haul/')
      .expect(401)
    return response
  });

  it('Cant create a haul without a related trip - known to fail, fails because of lacking error handling', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/haul/addNew')
      .send({
        "launchDateTime": "2022-08-15T22:00:03.092Z",
        "launchPosition": "dasdas",
        "launchLatitude": 63.40595699218346,
        "launchLongitude": 10.406196141997356,
        "haulDateTime": "2022-09-15T14:37:04.837Z",
        "haulPosition": "asdas",
        "haulLatitude": 63.40595699218346,
        "haulLongitude": 10.406196141997356,
        "tripNo": 404
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


