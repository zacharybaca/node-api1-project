// implement your API here
const express = require('express');

//Import Database
const db = require('./data/db');

const server = express();

server.use(express.json());

//Get Users In Database
server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error Getting Users' });
    });
});

//Get User By ID
server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(found => {
      if (found) {
        res.status(200).json({ message: 'found' });
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'error' });
    });
});

//Add User
server.post('/users', (req, res) => {
  const userData = req.body;
  db.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'error adding' });
    });
});

//Remove User
server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: 'removed' });
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'error' });
    });
});

//Update User

const port = 4000;

server.listen(port, () => {
  console.log('API Running');
});
