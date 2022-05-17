
const express = require('express');
const app = express();
const cors = require('cors')

const authentication = require('./authentication.js');
const registration = require('./registration.js')
const tokenChecker = require('./tokenchecker.js');

const users = require('./user.js');


/**
 * Configure Express.js parsing middleware
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors())
 const notFoundMiddleware = require('../middleware/not-found');
const errorHandlerMiddleware = require('../middleware/error-handler');

app.use('/', express.static(process.env.FRONTEND || 'static'));
app.use('/', express.static('static')); // expose also this folder



app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})

app.use('/api/v1/authentications', authentication);
app.use('/api/v1/registration', registration);
app.use('/api/v1/users', tokenChecker);

app.use('/api/v1/user', users);




 module.exports = app