'use strict';

const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, require: true }
});

userSchema.methods.authenticateUser = async function() {
  let username = this.username;
  let password = this.password;
  let hash = await bcrypt.hash(password, 10);
  this.password = hash;
  return this;
}

userSchema.methods.generateToken = async function() {
  let token = jwt.sign({ username: this.username }, 'SECRET_STRING');
  return token;
}

let user = mongoose.model('user', userSchema)

module.exports = user;
