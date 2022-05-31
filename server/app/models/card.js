
var mongoose = require('mongoose');
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
  date: {
      type: String,
      required: [true, 'Please provide date'],
      minlength: 1
  },

  /*date: {
        type: Date,
        required: [true, 'Please provide date'],
        validator: function (v) {
            return (
              v && // check that there is a date object
              v.getTime() > Date.now()
            );
          },
  },*/
  comment: {
        type: String,
  },
}));