
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

      startDate: {
            type: Date,
            required: [true, 'Please provide start date'],
      },
      endDate: {
            type: Date,
            required: [true, 'Please provide end date'],
            },
      comment: {
            type: String,
      },
      color: {
            type: String,
      }

}));