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

app.get('/api/record',(req,res) => {
  const body = req.body;

  if(!body.name || !body.number) {
    return res.status(400).json({Error: 'Name or Number missing'});
  }

  const record = new Record({
    name: body.name,
    number: body.number
  })

  record.save().then( savedRecord =>{
    res.json(savedRecord);
  })
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
});

app.post('/api/record',(req, res) => {
  const record = req.body;
  console.log(record);

  switch(true) {
    case record.map(record => 
      record.name.toLowerCase()).includes(record.name.toLowerCase()):
      res.status(400).send({error: 'name must be unique'})
      break;
    case (record.map(record => 
      record.number).includes(record.number)):
      res.status(400).send({ error: 'number must be unique'})
      break;
    default:
      let id = Math.max(...record.map(record => parseInt(record.id))) + 1;
      record = record.concat({id, ...record})
      res.json(record);
  }
}) */

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})