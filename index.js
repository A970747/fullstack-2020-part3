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
})

app.get('/api/persons',(request,response) => {
  response.json(persons);
})

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`)