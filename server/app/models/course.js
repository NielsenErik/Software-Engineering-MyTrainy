var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Course', new Schema({ 
  userId:{
      type: String,
      required: [true, 'Please login'],
  },
	title: {
    type: String,
    unique: true,
    required: [true, 'Please provide a title'],
  },
  sport: {
    type: String,
    required: [true, 'Please provide a sport'],
    minlength: 3,
  },
  comment: {
    type: String,
  },
}));