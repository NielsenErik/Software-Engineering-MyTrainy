const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken'); 
require('dotenv').config()


router.post('', login = async function(req, res) {
	// find the user
	let user = await User.findOne({
		email: req.body.email
	}).exec();
	
	
	// user not found
	if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}
	
	// check if password matches
	if (user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		res.redirect('/')
	}
	
	
	// if user is found and password is right create a token
	var payload = {
		email: user.email,
		id: user._id
		// other data encrypted in the token	
	}
	
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

	res.redirect('/api/v1/user/'+user._id)

});

router.post('', register = async (req, res) => {
	const { email, password, userType } = req.body;
  
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
	  throw new CustomError.BadRequestError('Email already exists');
	}
  
	// first registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
  
	const user = await User.create({ email, password, userType });
	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
  });

module.exports = router