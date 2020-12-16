const recordRouter = require('express').Router();
const Record = require('../models/record');

recordRouter.get('/', (_, res, next) => {
  Record.find({})
    .then((records) => res.json(records))
    .catch((error) => next(error));
});

recordRouter.post('/', (req, res, next) => {
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

recordRouter.get('/:id', (req, res, next) => {
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

recordRouter.put('/:id', (req, res, next) => {
  const record = { ...req.body };

  Record.findByIdAndUpdate(req.params.id, record, { new: true })
    .then((updatedRecord) => res.json(updatedRecord))
    .catch((error) => next(error));
});

recordRouter.delete('/:id', (req, res, next) => {
  Record.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = recordRouter;
