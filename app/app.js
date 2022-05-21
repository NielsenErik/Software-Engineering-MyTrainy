const express = require('express');
const app = express();
const cors = require('cors')

const authentication = require('./authentication.js');
const tokenChecker = require('./tokenchecker.js');
const cards = require('./card.js');
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
app.use('/api/v1/users/me', tokenChecker);
app.use('/api/v1/users', users);

app.use('/api/v1/card', cards); 

console.log('')

app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app