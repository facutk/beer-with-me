const express = require("express");
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();

const todoRoutes = express.Router();

todoRoutes.route('/todos').get((req, res) => {
  const query = datastore
  	.createQuery('Todo');

  return datastore.runQuery(query)
    .then(([entities]) => {
      // The get operation will not fail for a non-existent entity, it just
      // returns an empty dictionary.
      if (!entities) {
        throw new Error(`No entity found for key ${key.path.join('/')}.`);
      }

      const entitiesWithId = entities.map(entity => Object.assign({}, entity, {
        id: entity[datastore.KEY].id
      }));

      res.status(200).json(entitiesWithId);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
      return Promise.reject(err);
    });
});

todoRoutes.route('/todos').post((req, res) => {
  const todoKey = datastore.key('Todo');
  const description = req.body.description || '';

  const todoEntity = {
    key: todoKey,
    data: [
      {
        name: 'created',
        value: new Date().toJSON(),
      },
      {
        name: 'description',
        value: description,
        excludeFromIndexes: true,
      },
      {
        name: 'done',
        value: false,
      },
    ],
  };

  datastore
    .save(todoEntity)
    .then(() => {
      console.log(`Todo  ${todoKey.id} created successfully.`);
      res.status(200).json(todoEntity);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message);
      return Promise.reject(err);
    });
});

todoRoutes.route('/todo/:id').delete((req, res) => {
  const todoKey = datastore.key(['Todo', parseInt(req.params.id, 10)]);

  datastore
    .delete(todoKey)
    .then(() => {
      console.log(`Todo  ${todoKey.id} deleted.`);
      res.status(200).json({msg: `Todo  ${todoKey.id} deleted.`});
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message);
      return Promise.reject(err);
    });
});

module.exports = todoRoutes;
