const mongoose = require('mongoose');
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
  name: String,
  number: String
})

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Record', recordSchema)