const express = require('express');
const app = express();

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

app.get('/api',(request,response) => {
  response.send('Hey! This is the root. Welcome.');
  console.log('testerino')
})

app.get('/api/persons',(request,response) => {
  response.json(persons);
})

app.get('/api/info',(request,response) => {
  response.send(
    `<p>This phone has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`
  );
})

app.get('/api/persons/:id',(request,response) => {
  const id = parseInt(request.params.id);
  const record = persons.find(record => record.id === id)
  if(record){
    response.json(record);
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(record => record.id !== id);
  res.status(204).end();
});

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);