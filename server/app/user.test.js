const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app     = require('./app');
const mongoose = require('mongoose');

describe('GET /api/v1/users/me', () => {

  // Moking User.findOne method
  let userSpy;

  beforeAll( () => {
    const User = require('./models/user');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
      return {
        id: '6289fdc6e1f3837f4b4ca5b3',
        email: 'example@example.com'
      };
    });
  });

  afterAll(async () => {
    userSpy.mockRestore();
  });
  
  test('GET /api/v1/users/me with no token should return 401', async () => {
    const response = await request(app).get('/api/v1/users/me');
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/v1/users/me?token=<invalid> should return 403', async () => {
    const response = await request(app).get('/api/v1/users/me?token=123456');
    expect(response.statusCode).toBe(403);
  });

  // create a valid token
  var payload = {
    email: 'example@example.com'
  }
  var options = {
    expiresIn: 86400 // expires in 24 hours
  }
  var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
      
  test('GET /api/v1/users/me?token=<valid> should return 200', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1/users/me?token='+token);
    expect(response.statusCode).toBe(200);
  });

  //To fix
  /*
  test('GET /api/v1/users/me?token=<valid> should return user information', async () => {
    expect.assertions(2);
    const response = await request(app).get('/api/v1/students/me?token='+token);
    const user = response.body;
    expect(user).toBeDefined();
    expect(user.email).toBe('example@example.com');
  });*/

  
});

describe('POST /api/v1/users', () =>{
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
    test('POST /api/v1/users with email not specified', () => {
        return request(app)
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .expect(400, { error: 'The field "email" must be a non-empty string, in email format' });
    });

    //Must fix test with already existing email
    /*test('POST /api/v1/users with email already existing ', () => {
        return request(app)
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .send( {user:'example@example.com'})
        .expect(400, { error: 'The email already exists' });
    });*/

});
