const mongoose = require('mongoose');

const password = process.argv[2];
const nodeArgs = process.argv.length;

if (nodeArgs < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const url = `mongodb+srv://fullstack:${password}@cluster0.8ob9a.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected successfully'))
  .catch(() => console.log('no dice big momma'));

const recordSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  number: String,
});

const Record = mongoose.model('Record', recordSchema);

switch (true) {
case (nodeArgs === 5):
  Record.find({})
    .then((records) => {
      const id = Math.max(...records.map((record) => parseInt(record._id))) + 1;
      const record = new Record({
        _id: id,
        name: process.argv[3],
        number: process.argv[4],
      });
      record.save().then(() => {
        console.log(`Added ${record.name} number ${record.number} to phonebook.`);
        mongoose.connection.close();
      });
    });
  break;
case (nodeArgs === 3):
  Record.find({})
    .then((records) => {
      records.forEach((record) => console.log(`${record.name} ${record.number}`));
      mongoose.connection.close();
    });
  break;
default:
  console.log('Incorrect number of arguments provided in Node statement - Make sure any arguments with spaces are wrapped in quotations.');
  mongoose.connection.close();
  break;
}
