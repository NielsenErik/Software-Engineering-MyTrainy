const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const card = require('./models/card');
const router = express.Router();
const User = require('./models/card'); // get our mongoose model

// get all Cards
router.get('/', async (req, res) =>{
    const cards = await card.find({})
    res.status(200).json(cards);
    //res.send('get all Cards')
})

//get single Card
router.get('/:id', async (req, res) =>{
    const {id: cardID} = req.params
    const cardSelected = await
    card.findOne({_id:cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID}', 404))
    }
    res.status(200).json({cardSelected});
   // res.send('get single Card')
})

//create Card
router.post('/', async (req, res) =>{
    const newCard = await
    card.create(req.body)
    res.status(200).json({card})
})

//update Card
router.patch('/:id', async (req, res) =>{
    const {id: cardID} = req.params
    const cardSelected = await card.findByIdAndUpdate({_id:cardID}, req.body, {
        new : true,
        runValidators : true
    })
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID', 404))
    }   
    res.status(200).json({cardSelected})
})

//delete Card
router.delete('/:id', async (req, res, next) =>{
    const {id: cardID} = req.params
    const cardSelected = await
    card.findOneAndDelete({_id: cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID', 404))
    }
    res.status(200).json({cardSelected})
    
})


module.exports = router