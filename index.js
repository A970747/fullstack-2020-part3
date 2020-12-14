require('dotenv').config();
const Record = require('./models/record');
const { req, res, response} = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT
const app = express();


app.use(express.json());
app.use(cors());

morgan.token('postBody', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :postBody'));
app.use(express.static('build'));

const unknownEndpoint = (req,res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.get('/api',(req,res) => {
  res.send('Hey! This is the root. Welcome.');
})

app.get('/api/records',(req,res) => {
  Record.find({})
    .then(records => {
      console.log('phonebook:', records);
      res.json(records);
    })
    .catch(error => console.log(error.message));
})

app.get('/api/record/:id',(req,res) => {
  const id = parseInt(req.params.id);

  Record.findById(id).then( record => {
    res.json(record);
  })
})

/* app.delete('/api/record/:id', (req, res) => {
  const id = parseInt(req.params.id);
  record = record.filter(record => record.id !== id);
  res.status(204).end();
}); */

app.post('/api/record',(req, res) => {
  const body = req.body;

  if(!body.name || !body.number) {
    return res.status(400).json({Error: 'Name or Number missing'});
  }

  const record = new Record({
    _id: body.id,
    name: body.name,
    number: body.number
  })

  record.save()
    .then( savedRecord =>{
      res.json(savedRecord);
    })
    .catch( error => console.log(error.message))
})

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})