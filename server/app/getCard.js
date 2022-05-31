const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const Card = require('./models/card');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

router.get('/:userId', async function(req, res){
    ////////////////////////////////////////////////////
    console.log("in Cards")

    const {userId: userID} = req.params
    let userCard = await Card.find({userId:userID})
    if(!userCard){
        return next(createCustomError('No card for user with id:'+req.params, 404))
    }

    userCard = userCard.map( (dbEntry) => {
        return {
            self: '/api/v1/card/' + dbEntry.id,
            title: dbEntry.title,
            sport: dbEntry.sport,
            date: dbEntry.date,
            // Aggiunta da Nick
            // id: dbEntry.id,
            comment: dbEntry.comment,
        };
    });
    console.log("return from cards")
    res.status(200).json(userCard);

})

module.exports = router