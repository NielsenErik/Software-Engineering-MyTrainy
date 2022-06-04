const express = require('express');
const res = require('express/lib/response');
const { createCustomError } = require('../errors/custom-error');
const Course = require('./models/course');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

router.get('/:userId', async function(req, res){
    ////////////////////////////////////////////////////
    console.log("in Courses")

    const {userId: userID} = req.params
    let userCourse = await Course.find({userId:userID})
    if(!userCourse){
        return next(createCustomError('No course for user with id:'+req.params, 404))
    }
    
    console.log(userCourse);

    userCourse = userCourse.map( (dbEntry) => {
        return {
            self: '/api/v1/course/' + dbEntry.id,
            id: dbEntry.id,
            title: dbEntry.title,
            sport: dbEntry.sport,
            comment: dbEntry.comment,
        };
    });
    console.log("return from Courses")
    res.status(200).json(userCourse);

})

module.exports = router