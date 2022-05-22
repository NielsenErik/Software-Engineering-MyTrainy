
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Card', new Schema({ 
      userId:{
            type: String,
      },
	title: {
        type: String,
        required: [true, 'Please provide card Title'],
        minlength: 1
  },
  sport: {
        type: String,
        required: [true, 'Please provide sport'],
        minlength: 1
  },
  date: {
        type: String,
        required: [true, 'Please provide date'],
        minlength:1
  },
  comment: {
        type: String,
  },
}));