const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
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

// CORS Middleware
// Allows angular app to access node.js (during development?).
// TODO(timhsieh): Remove this for prod?
app.use(cors());

// Body Parser Middleware
// Parase HTTP Request body to JSON object.
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Add routes
app.use('/users', users);
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Start Server
app.listen(port, () => {
  console.log('Server started on port' + port);
});