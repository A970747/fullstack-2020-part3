require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Record = require('./models/record');

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

morgan.token('postBody', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :postBody'));
app.use(express.static('build'));

app.get('/api', (_, res) => {
  res.send('Hey! This is the root. Welcome.');
});

app.get('/info', (_, res, next) => {
  Record.find({})
    .then((records) => res.send(
      `<p>This phonebook has info for ${records.length} people.</p>
      <p>${new Date()}</p>`,
    ))
    .catch((error) => next(error));
});

app.get('/api/records', (_, res, next) => {
  Record.find({})
    .then((records) => res.json(records))
    .catch((error) => next(error));
});

app.post('/api/records', (req, res, next) => {
  const { body } = req;

  const record = new Record({
    _id: body.id,
    name: body.name,
    number: body.number,
  });

  record.save()
    .then((savedRecord) => res.json(savedRecord))
    .catch((error) => next(error));
});

app.get('/api/records/:id', (req, res, next) => {
  Record.findById(req.params.id)
    .then((record) => {
      if (record) {
        res.json(record);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put('/api/records/:id', (req, res, next) => {
  const record = { ...req.body };

  Record.findByIdAndUpdate(req.params.id, record, { new: true })
    .then((updatedRecord) => res.json(updatedRecord))
    .catch((error) => next(error));
});

app.delete('/api/records/:id', (req, res, next) => {
  Record.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, _, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ Error: 'Malformatted ID' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ Error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
