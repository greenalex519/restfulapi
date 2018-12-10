//BASE SETUP

const Rat = require('../client/models/rat');

//call packages needed
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds227654.mlab.com:27654/restfulapi');

//configure app to use bodyParser()
//this allows us to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

//ROUTES FOR API
//
const router = express.Router(); //get an instance of express router

//middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Middleware reached.');
  next(); //make sure it then continues on its request to route...
})

//test route to check is working
router.get('/', function(req, res) {
  res.json({ message: 'hurray! welcome to our API!' });
});

//more routes for API will happen here

//REGISTER OUR ROUTES
//all of our routes will be prefixed with '/api'
app.use('/api', router);

//START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
