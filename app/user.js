
const express = require('express');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model
const jwt = require('jsonwebtoken'); 
require('dotenv').config()

router.get('/:id', async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }
    
    res.status(200).json({ user })
});

router.get('/me', async (req, res) => {
    if(!req.loggedUser) {
        return;
    }

    let user = await User.findOne({email: req.loggedUser.email});

    res.status(200).json({
        self: '/api/v1/users/' + user.id,
        email: user.email
    });
});


router.post('', async (req, res) => {
    
	let user = new User({
        email: req.body.email,
        password: req.body.password,
        userType : req.body.userType
    });

    if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }

    // find the user
	let checkEmail = await User.findOne({
		email: req.body.email
	}).exec();

    if (checkEmail){
        console.log('The email already exists')
        res.status(500).json({ error: 'The email already exists' });
        return;
    }
    
    
	user = await user.save();
    
    let userId = user.id;

    
    console.log('Created user with:'+user.email)
    return res.json({
		success: true,
		email: user.email,
		id: userId,
		self: "api/v1/users" + userId
	}).status(200);
    

    
});

function checkIfEmailInString(text) {
    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = router;