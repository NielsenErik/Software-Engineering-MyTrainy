
var mongoose = require('mongoose');
var Card = require('./card')
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Card', new Schema({ 
    userId:{
        type: String,
        required: [true, 'Please login'],
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
  card:{
      type: [Card],
      default: undefined
  }


}));