const { res, response } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellos',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-532523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]

app.use(morgan('tiny'));

const unknownEndpoint = (req,res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.get('/api',(req,res) => {
  res.send('Hey! This is the root. Welcome.');
})

app.get('/api/persons',(req,res) => {
  res.json(persons);
})

app.get('/api/info',(req,res) => {
  res.send(
    `<p>This phone has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`
  );
})

app.get('/api/persons/:id',(req,res) => {
  const id = parseInt(req.params.id);
  const record = persons.find(record => record.id === id)
  if(record){
    res.json(record);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(record => record.id !== id);
  res.status(204).end();
});

app.post('/api/persons',(req, res) => {
  const record = req.body;

  switch(true) {
    case persons.map(record => 
      record.name.toLowerCase()).includes(record.name.toLowerCase()):
      res.status(400).send({error: 'name must be unique'})
      break;
    case (persons.map(record => 
      record.number).includes(record.number)):
      res.status(400).send({ error: 'number must be unique'})
      break;
    default:
      let id = Math.max(...persons.map(record => parseInt(record.id))) + 1;
      persons = persons.concat({id, ...record})
      res.json(record);
  }
})

app.use(unknownEndpoint);

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);