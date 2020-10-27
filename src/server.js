'use strict'

const express = require('express');
const app = express();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userModel = require('./auth/models/users-model.js')

app.post('/signup', signupHandler);
app.post('/signin', signinHandler)

function signupHandler(req, res, next) {
  try {
    let newUser = new userModel(req.body);
    newUser.authenticateUser()
      .then(results => {
        results.save()
          .then(results => {
            results.generateToken()
              .then(results => res.send(results))
          })
      });
  } catch(e) {console.log(e)}
}

function signinHandler(req, res, next) {
let user = new userModel(req.body);
user.generateToken()
.then(data => console.log(data))

}

// Basic Authentication Middleware
async function authenticateBasic (user, pass) {

  let isValidPassword = await bcrypt.compare(pass, this[user].password);
  console.log(isValidPassword);
  if (isValidPassword) {
    return this.generateToken(user);
  } else {
    return Promise.reject('no user found');
  }
}

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send('Try again');
});


module.exports = app;