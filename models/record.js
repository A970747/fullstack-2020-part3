const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true 
  })
    .then(() => console.log('Connected successfully'))
    .catch(error => console.log('Error connecting to MongoDB', error.message))

const recordSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: [true, 'Name required']
  },
  number: {
    type: String,
    minlength: 8,
    unique: true,
    required: [true, 'Number required']
  }
})

recordSchema.plugin(uniqueValidator);

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Record', recordSchema)