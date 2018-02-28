const express = require('express');
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const path = require('path');
const authentication = require('./routes/authentication')(router); // Import Authentication Routes
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.promise = global.promise;
mongoose.connect(config.uri ,(err)=>{
  if(err){
    console.log('con not connect to database:', err);
  }else{
    console.log('connected to database:', config.db);
  }
});


app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname +'/client/dist'));
app.use('/authentication', authentication); // Use Authentication routes in application

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080,()=>{
  console.log("llstening on port 8080");
});
