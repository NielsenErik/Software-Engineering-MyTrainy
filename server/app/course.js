const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const { db } = require('./models/course');
const Course = require('./models/course');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

// get single Course

router.get('/:id', async (req, res, next) =>{
    console.log("single Course")
    const {id: courseID} = req.params
    const courseSelected = await Course.findOne({_id:courseID})
    if(!courseSelected){
        return next(createCustomError(`No course with id : ${courseID}`, 404))
    }
    res.status(200).json({courseSelected});
})

//create Course

router.post('/:userId', async (req, res, next) =>{
    console.log("Creating a new course...");
    const {userId: userID} = req.params
    let checkUser = await User.find({userId:userID})
    if(!checkUser){
        return next(createCustomError('No logged user yet', 500))
    }
    let newCourse = await Course.create(req.body)
        console.log("return from POST course")
    res.status(200).json(newCourse);

    return {
        self: '/api/v1/course/' + newCourse.id,
        title: newCourse.title,
        sport: newCourse.sport,
    };
})
    

//update Course

router.patch('/:id', async (req, res, next) =>{
    const {id: courseID} = req.params
    const courseSelected = await Course.findByIdAndUpdate({_id:courseID}, req.body, {
        new : true,
        runValidators : true
    })
    if(!courseSelected){
        return next(createCustomError(`No course with id : ${courseID}`, 404))
    }   
    // res.json(cardSelected.title + " "+ cardSelected.comment).status(200)
    res.json({
        title: courseSelected.title,
        sport: courseSelected.sport,
        comment: courseSelected.comment,
    }).status(200)
})

//delete Course

router.delete('/:id', async (req, res, next) =>{
    console.log("deleting course...")
    console.log(req.params)
    const {id: courseID} = req.params
    const courseSelected = await Course.findOneAndDelete({_id: courseID})
    console.log(courseSelected)
    if(!courseSelected){
        return next(createCustomError(`No course with id : ${courseID}`, 404))
    }
    res.status(200).json({courseSelected})
    
})


module.exports = router

