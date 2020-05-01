//BASE SETUP
//call packages needed
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//configure app to use bodyParser()
//this allows us to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 8080;

//DATABASE SETUP
const mongoose = require('mongoose');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds227654.mlab.com:27654/restfulapi');

//Rat model lives here
const Rat = require('../client/models/rat');

//ROUTES FOR API
//===================================================

//create router
const router = express.Router(); //get an instance of express router

//middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Middleware reached.');
  next(); //make sure it then continues on its request to route...
});
//middleware can later be added to confirm request is safe etc; user is authenticated; log data for analytics; collect statistic data etc...

//test route to check is working
router.get('/', function(req, res) {
  res.json({ message: 'hurray! welcome to our API!' });
});

//on routes that end in /rats
router.route('/rats')

  ///create a rat (accessed at POST localhost:8080/api/rats)
  .post(function(req, res){
    const rat = new Rat(); //create new instance of the rat model
    rat.name = req.body.name; //set rats name via request

    rat.save(function(err) {

      if (err)
        res.send(err);
      
        res.json({ message: "Rat created!"});
    });

  });


//REGISTER OUR ROUTES
//all of our routes will be prefixed with '/api'
app.use('/api', router);

//START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
