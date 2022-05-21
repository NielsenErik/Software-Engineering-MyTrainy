const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const Card = require('./models/card');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

// get all Cards
router.get('/:userId', async function(req, res){
    ////////////////////////////////////////////////////
    console.log("in CArds")

    const {userId: userID} = req.params
    let userCard = await Card.find({userId:userID})
    if(!userCard){
        return next(createCustomError('No card for user with id:'+req.params, 404))
    }

    /*const {userId : } = req.params
    
    console.log(userID)
    let userCard = await Card.find({
        userId: req.params
    }).exec();
    if ( userID. ){
        userCard = await Card.find({
            userId: userID
        }).exec();
        console.log("got users card w "+usersCard.userId)
        
    }    
    else{
        usersCard = await Card.find({}).exec();
        console.log("got user id "+usersCard.userId)
    }*/
    

    userCard = userCard.map( (dbEntry) => {
        return {
            self: '/api/v1/card/' + dbEntry.id,
            title: dbEntry.title,
            sport: dbEntry.sport,
            date: dbEntry.date,
        };
    });
    console.log("return from cards")
    res.status(200).json(userCard);

    ///////////////////////////////////////////
    //const cards = await Card.find({})
    //res.status(200).json(cards);
    //res.send('get all Cards')
})

//get single Card
router.get('/:id', async (req, res) =>{
    const {id: cardID} = req.params
    const cardSelected = await Card.findOne({_id:cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID}', 404))
    }
    res.json({cardSelected}).status(200);
   // res.send('get single Card')
})

//create Card
router.post('/', async (req, res) =>{
    const newCard = await
    Card.create(req.body)
    res.status(200).json({card: Card})
})

//update Card
router.patch('/:id', async (req, res) =>{
    const {id: cardID} = req.params
    const cardSelected = await Card.findByIdAndUpdate({_id:cardID}, req.body, {
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
    Card.findOneAndDelete({_id: cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID', 404))
    }
    res.status(200).json({cardSelected})
    
})


module.exports = router




