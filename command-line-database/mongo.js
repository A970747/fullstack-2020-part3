const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = 
  `mongodb+srv://fullstack:${password}@cluster0.8ob9a.mongodb.net/note-app?retryWrites=true&w=majority`

  mongoose.connect(url, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false, 
      useCreateIndex: true 
    }
  ).then(() => console.log('connected successfully'))
  .catch(() => console.log('no dice big momma'))

  const recordSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    number: String
  })
  
  const Record = mongoose.model('Record', recordSchema)
  
  const record = new Record({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
  })
  
/*   Record.find({}).then(result => {
    result.forEach(note => {
      console.log(note);
    })
    mongoose.connection.close();
  }) */