const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbconfig = require('./config/database');

// Connect To Database
mongoose.connect(dbconfig.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + dbconfig.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

const app = express();
const users = require('./routes/users');

// Port Number
const port = 3000;

// Body Parser Middleware
// Parase HTTP Request body to JSON object.
app.use(bodyParser.json());

// Add routes
app.use('/users', users);
app.get('/', function(req, res){
   res.send("Hello world!");
});


// Start Server
app.listen(port, () => {
  console.log('Server started on port' + port);
});