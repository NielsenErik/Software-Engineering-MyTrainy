
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email'],
        },
      password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8,
      },
      userType: {
        type: String,
        enum: ['Athlete', 'Trainer'],
        required: [true, 'Please provide type of user'],
        default: 'user',
      },
}));