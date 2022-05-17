
const express = require('express');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model

router.get('/:id', async (req, res) => {
    const { id: userID } = req.params
    // https://mongoosejs.com/docs/api.html#model_Model.find
    const user = await User.findOne({ _id: userID })
    if (!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
    }
    
    res.status(200).json({ user })
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

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
     return res.redirect('users/'+userId)
    
});

function checkIfEmailInString(text) {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

module.exports = router;