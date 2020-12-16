const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const recordSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: [true, 'Name required'],
  },
  number: {
    type: String,
    minlength: 8,
    unique: true,
    required: [true, 'Number required'],
  },
});

recordSchema.plugin(uniqueValidator);

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // eslint-disable-line
    delete returnedObject._id; // eslint-disable-line
    delete returnedObject.__v; // eslint-disable-line
  },
});

module.exports = mongoose.model('Record', recordSchema);
