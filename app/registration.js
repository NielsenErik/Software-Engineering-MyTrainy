const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken'); 
require('dotenv').config()

router.post('', register = async (req, res) => {
    console.log("in registration.js")
	const { email, password, userType } = req.body;
    console.log("After req")
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
	  throw new CustomError.BadRequestError('Email already exists');
	}
    console.log("After mail exist")
	// first registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
    console.log("After first account")
	const user = await User.create({ email, password, userType });
    console.log("After create")
	const tokenUser = createTokenUser(user);
    console.log("After tokenUser")
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
    res.send('/')
  });

module.exports = router