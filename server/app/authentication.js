const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken'); 
require('dotenv').config()


router.post('', login = async function(req, res) {
	console.log(req.body)
	// find the user
	let user = await User.findOne({
		email: req.body.email
	}).exec();
	
	console.log(`var user: ${user}`);

	// user not found
	if (!user) {
		console.log('Authentication failed. User not found.')
		res.json({ success: false, message: 'Authentication failed. User not found.' }).status(400);
		return;
	}
	
	// check if password matches
	if (user.password != req.body.password) {
		console.log('Authentication failed. Wrong password.')
		res.json({ success: false, message: 'Authentication failed. Wrong password.' }).status(401);
		return;
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

	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		email: user.email,
		id: user._id,
		self: "api/v1/" + user._id
	}).status(200);
	console.log('Login avvenuto')

});


module.exports = router