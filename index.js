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

app.get('/api',(req,res) => {
  res.send('Hey! This is the root. Welcome.');
})

app.get('/api/records',(req,res) => {
  Record.find({})
    .then(records => {
      console.log('phonebook:', records);
      res.json(records);
    })
    .catch(error => next(error));
})

app.post('/api/records',(req, res) => {
  const body = req.body;

  if(!body.name || !body.number) {
    return res.status(400).json({Error: 'Name or Number missing'});
  }

  const record = new Record({
    _id: body.id,
    name: body.name,
    number: body.number
  });

  record.save()
    .then(savedRecord => res.json(savedRecord))
    .catch(error => next(error));
})

app.get('/api/records/:id',(req,res) => {
  Record.findById(req.params.id)
    .then( record => {
      (record)
        ? res.json(record)
        : res.status(404).end();
    })
    .catch( error => next(error))
})

app.put('/api/records/:id', (req, res, next) => {
  const body = req.body;

  const record = {...body}

  Record.findByIdAndUpdate(req.params.id, record, {new: true})
    .then( updatedRecord => res.json(updatedRecord))
    .catch(error => next(error));
})

app.delete('/api/records/:id', (req, res, next) => {
  Record.findByIdAndRemove(req.params.id)
    .then( result => res.status(204).end())
    .catch( error => next(error));
});

const unknownEndpoint = (req,res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  
  if(error.name=== 'CastError') {
    return res.status(400).send({Error: 'Malformatted ID'});
  }

  next(error);
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})