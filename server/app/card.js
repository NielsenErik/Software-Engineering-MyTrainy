const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const { db } = require('./models/card');
const Card = require('./models/card');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

// get single Card

router.get('/:id', async (req, res, next) =>{
    console.log("in single Cards")
    const {id: cardID} = req.params
    const cardSelected = await Card.findOne({_id:cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID}', 404))
    }
    res.status(200).json({cardSelected});
})

//create Card

router.post('/:userId', async (req, res, next) =>{
    const {userId: userID} = req.params
    let checkUser = await User.find({userId:userID})
    if(!checkUser){
        return next(createCustomError('No logged user yet', 500))
    }
    let newCard = await Card.create(req.body)
    // newCard = newCard.map( (dbEntry) => {
        console.log("return from POST cards")
    res.status(200).json(newCard);

        return {
            self: '/api/v2/card/' + newCard.id,
            title: newCard.title,
            sport: newCard.sport,
            startDate: newCard.startDate,
            endDate: newCard.endDate,
            color: newCard.color,
        };
})
    

//update Card

router.patch('/:id', async (req, res, next) =>{
    const {id: cardID} = req.params
    const cardSelected = await Card.findByIdAndUpdate({_id:cardID}, req.body, {
        new : true,
        runValidators : true
    })
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID', 404))
    }   
    // res.json(cardSelected.title + " "+ cardSelected.comment).status(200)
    res.json({
        title: cardSelected.title,
        sport: cardSelected.sport,
        startDate: cardSelected.startDate,
        endDate: cardSelected.endDate,
        comment: cardSelected.comment,
        color: cardSelected.color,
    }).status(200)
})

//delete Card

router.delete('/:id', async (req, res, next) =>{
    const {id: cardID} = req.params
    const cardSelected = await Card.findOneAndDelete({_id: cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID', 404))
    }
    return res.status(200).json({cardSelected})
    
})


module.exports = router