const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const Program = require('./models/program');
const Card = require('./card');
const router = express.Router();
const User = require('./models/user'); 

//get single Program

router.get('/:id', async (req, res, next) =>{
    console.log("in single Program")
    const {id: programID} = req.params
    const programSelected = await Program.findOne({_id:programID})
    if(!programSelected){
        return next(createCustomError('No program with id : ${programID}', 404))
    }
    res.status(200).json({programSelected})
})


//create Program

router.post('/:userId', async (req, res, next) => {
    const {userId : userID} = req.params
    let checkUser = await User.find({userId: userID})
    if(!checkUser){
        return next(createCustomError('No logged user yet', 500))
    }
    let newProgram = await Program.create(req.body)
    console.log(newProgram)
    console.log('return from POST programs')
    res.status(200).json(newProgram);
})

//update Program

router.patch('/:id', async (req, res, next) =>{
    const {id: programID} = req.params
    const programSelected = await Program.findByIdAndUpdate({_id: programID}, req.body, {
        new : true,
        runValidators : true
    })
    if(!programSelected){
        return next(createCustomError('No program with id : ${programID}', 404))
    }
    res.status(200).json({
        title: programSelected.title,
        sport: programSelected.sport,
        color: programSelected.color,
        comment: programSelected.comment,
    })
    console.log('ProgramSelected updated')
})


//delete Program

router.delete('/:id', async (req, res, next) =>{
    const {id: programID} = req.params
    const programSelected = await Program.findByIdAndDelete({_id: programID})
    if(!programSelected){
        return next(createCustomError('No program with id : ${programID}', 404))
    }
    res.status(200).json({programSelected})
    console.log('ProgramSelected deleted');
})


module.exports = router
