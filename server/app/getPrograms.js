const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const Card = require('./models/card');
const Program = require('./models/program');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model


router.get('/:userId', async function(req, res){
    console.log('in Programs')
    const{userId :userID} = req.params
    let userProgram = await Program.find({userId:userID})
    if(!userProgram){
        return next(createCustomError('No program for user with id:' + req.params, 404))
    }
    userProgram = userProgram.map( (dbEntry) =>{
        return{
            self: '/api/v1/program/' + dbEntry.id,
            title: dbEntry.title,
            sport: dbEntry.sport,
            color: dbEntry.color,
            comment: dbEntry.comment,
        };
    })
    console.log('return from programs')
    res.status(200).json(userProgram);
})



module.exports = router