const { response } = require('express');
const express = require('express');
const app = express();

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

app.get('/api',(request,response) => {
  response.send('Hey! This is the root. Welcome.');
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
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(record => record.id !== id);
  res.status(204).end();
});

app.post('/api/persons',(req, res) => {
  const record = req.body;
  let id = Math.max(...persons.map(record => parseInt(record.id))) + 1;
  persons = persons.concat({id, ...record})
  res.json(record);
})

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);