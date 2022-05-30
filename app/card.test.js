const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app     = require('./app');
const mongoose = require('mongoose');

describe('GET /api/v1/card', () =>{
    let connection;

    beforeAll( async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
    //return connection; // Need to return the Promise db connection?
    });

    afterAll( () => {
        mongoose.connection.close(true);
        console.log("Database connection closed");
    });

});