'use strict';

const express = require('express');
const base64 = require('base-64');
const Users = require('./user-schema.js');
const authMiddleware = require('./middleware/basic.js');

const router = express.Router();

router.post('/signin', authMiddleware.basic, (req, res, next) => {

  if (req.token) {

    res.send(req.token);
  } else {
    res.status(401).send('authentication headers needed');
  }

});

router.post('/signup', (req, res, next) => {
  const userData = req.body;
  const newUser = new Users(userData);
  newUser.save()
    .then(async user => {
      const token = await user.generateToken();
      res.send(token);
    })
});


module.exports = router;