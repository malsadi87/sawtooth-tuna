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

  it('Cannot create a pallet-event with badly formated latitude', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-01T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": '63.40595699218346',
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cannot create a pallet-event with badly formated longitude', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-02T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": '10.406196141997356',
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });


  it('Cannot create a pallet-event with badly formated shock variable names', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-03T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceletation": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cannot create a pallet-event with badly formated tilt JSON', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-04T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "thisVariableShould not be accepted": 1,
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });


  
  it('Cannot create a pallet-event with badly formated location JSON', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-05T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
          "iAmNotSupposedToBeHere": "dontStoreThisVariable"
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cannot create a pallet-event with badly formated celsius', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-06T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "notAcelsiusVariableName": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cannot create a pallet-event with badly formated tilt', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-07T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "notRightName": 1,
          "wrongName2": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cannot create a pallet-event with weird latitude', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-08T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 6340595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Cannot create a pallet-event with weird tilt JSON (one too many ,)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-02-09T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitudeWeird": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": "\"{x: 5, y: 5,}\"",
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
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
          "longitude": 10.406196141997356
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });


  it('Cannot create another pallet-event with the same timestamp and palletNum', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-09-15T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400)
    return response
  });

  it('Can create another pallet-event with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-01-30T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201)
    return response
  });

  it('Can create another different pallet-event with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-01-29T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 64.40595699218346,
          "longitude": 2.406196141997356
        }),
        "tilt": JSON.stringify({
          "x": 5,
          "y": 5
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
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
        "eventTime": "2022-01-28T14:37:04.837Z",
        "palletNum": "1",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
      })
      .set('Authorization', `Bearer wrong`)
      .expect(401)
    return response
  });

  it('Can read a pallet-event with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/1/2022-01-30T14:37:04.837Z')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body.palletEventId).toEqual<number>(2)
    expect(response.body.eventTime).toEqual<string>("2022-01-30T14:37:04.837Z")
    expect(response.body.temperature).toEqual(JSON.stringify({ "Celsius": 1 }))
    expect(response.body.location).toEqual(JSON.stringify({
      "latitude": 63.40595699218346,
      "longitude": 10.406196141997356
    }))
    expect(response.body.tilt).toEqual(JSON.stringify({
      "x": 1,
      "y": 1
    }))
    expect(response.body.shock).toEqual(JSON.stringify({
      "acceleration": 1,
      "duration": 1
    }))
    return response
  });

  it('Cant read a pallet-event that doesnt exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/404/2404-10-13T22:00:00.062Z')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)

    return response
  });

  it('Cant read a pallet-event without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/1/2022-01-30T22:00:00.062Z')
      .expect(401)
    return response
  });

  it('Can read all pallet-events with authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "palletEventId": 2,
      "eventTime": "2022-01-30T14:37:04.837Z",
      "palletNum": "1",
      "temperature": JSON.stringify({ "Celsius": 1 }),
      "location": JSON.stringify({
        "latitude": 63.40595699218346,
        "longitude": 10.406196141997356
      }),
      "tilt": JSON.stringify({
        "x": 1,
        "y": 1
    }),
      "shock": JSON.stringify({
        "acceleration": 1,
        "duration": 1
      })
    }]))
    return response
  });


  it('Can read all pallet-events for a specific pallet.', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/sawtooth/tp/pallet-event/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
    expect(response.body).toEqual(expect.arrayContaining([{
      "palletEventId": 2,
      "eventTime": "2022-01-30T14:37:04.837Z",
      "palletNum": "1",
      "temperature": JSON.stringify({ "Celsius": 1 }),
      "location": JSON.stringify({
        "latitude": 63.40595699218346,
        "longitude": 10.406196141997356
      }),
      "tilt": JSON.stringify({
        "x": 1,
        "y": 1
    }),
      "shock": JSON.stringify({
        "acceleration": 1,
        "duration": 1
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

  it('Cant create a pallet-event without a related palletNum', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/sawtooth/tp/pallet-event/addNew')
      .send({
        "eventTime": "2022-01-30T14:37:04.837Z",
        "palletNum": "404",
        "temperature": JSON.stringify({ "Celsius": 1 }),
        "location": JSON.stringify({
          "latitude": 63.40595699218346,
          "longitude": 10.406196141997356,
        }),
        "tilt": JSON.stringify({
          "x": 1,
          "y": 1
        }),
        "shock": JSON.stringify({
          "acceleration": 1,
          "duration": 1
        })
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


