'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true }).then(data => console.log('Connected to MongoDB'));
const app = require('./src/server.js');
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));