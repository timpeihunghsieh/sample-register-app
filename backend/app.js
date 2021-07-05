const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Port Number
const port = 3000;

//  Add routes
app.get('/', function(req, res){
   res.send("Hello world!");
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port' + port);
});