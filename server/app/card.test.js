const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app     = require('./app');
const mongoose = require('mongoose');

describe('GET /api/v2/card', () =>{
    let connection;

    beforeAll( async () => {
        jest.setTimeout(15000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
    //return connection; // Need to return the Promise db connection?
    });

    afterAll( () => {
        mongoose.connection.close(true);
        console.log("Database connection closed");
    });
    test('GET /api/v2/card/:id should respond with json', async () => {
        return request(app)
          .get('/api/v2/card/6298d677fc4cdf93c325d823')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    test('GET /api/v2/card/ should respond with 404', async () => {
        return request(app)
          .get('/api/v2/card/')
          .expect(404);
      });
    });
