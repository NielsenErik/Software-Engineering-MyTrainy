const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const Card = require('./models/card');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

// get all Cards
router.get('', async (req, res) =>{
    ////////////////////////////////////////////////////
    console.log("Sono in get all Cards")
    let usersCard;

    if ( req.query.userId )
        userCard = await Card.find({
            userId: req.query.userId
        }).exec();
    
    else
        usersCard = await Card.find({}).exec();

    usersCard = usersCard.map( (dbEntry) => {
        return {
            self: '/api/v1/cards/' + dbEntry.id,
            student: '/api/v1/users/' + dbEntry.studentId,
        };
    });

    res.status(200).json(usersCard);

    ///////////////////////////////////////////
    //const cards = await Card.find({})
    //res.status(200).json(cards);
    //res.send('get all Cards')
})

//get single Card
router.get('/:id', async (req, res) =>{
    const {id: cardID} = req.params
    const cardSelected = await
    Card.findOne({_id:cardID})
    if(!cardSelected){
        return next(createCustomError('No card with id : ${cardID}', 404))
    }
    res.status(200).json({cardSelected});
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




