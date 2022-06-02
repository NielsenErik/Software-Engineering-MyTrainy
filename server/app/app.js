const express = require('express');
const app = express();
const cors = require('cors')

const authentication = require('./authentication.js');
const tokenChecker = require('./tokenchecker.js');
const cards = require('./card.js');
const users = require('./user.js');
const usersCard =require('./getCard.js');
const program = require('./program.js');
const userProgram = require('./getPrograms');
const tokenAPI = require('./tokenAPI');

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors())
 const notFoundMiddleware = require('../middleware/not-found');
const errorHandlerMiddleware = require('../middleware/error-handler');


app.use('/', express.static('static')); 



app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    res.status(200)
    next()
})

app.use('/api/v1/authentications', authentication);
app.use('/api/v1/users/me', tokenChecker);
app.use('/api/v1/users/me', tokenAPI);
app.use('/api/v1/users', users);
app.use('/api/v1/userCards', usersCard); //get all cards
// Aggiunta da Nick
// app.use('/api/v1/userCards', tokenAPI);
app.use('/api/v1/card', cards); //other methods for card
app.use('/api/v1/program', program);
app.use('/api/v1/userPrograms', userProgram); //get all programs


app.use((req, res) => {
    res.status(404);
    
    res.json({ error: 'Not found' });
});



module.exports = app