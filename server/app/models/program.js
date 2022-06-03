
var mongoose = require('mongoose');
const Card = require('./card')
var Schema = mongoose.Schema;

// set up a mongoose model

module.exports = mongoose.model('Program', new Schema({ 
  userId:{
      type: String,
      required: [true, 'Please login'],
    },
	title: {
        type: String,
        required: [true, 'Please provide program Title'],
        minlength: 1
  },
  sport: {
        type: String,
        required: [true, 'Please provide sport'],
        minlength: 1
  },
  color: {
    type: String,
  },
  comment: {
    type: String,
    minlength: 1,
  },

}));
