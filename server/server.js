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
//middleware can later be added to confirm request is safe etc; user is authenticated; log data for analytics; collect statistic data etc...

//test route to check is working
router.get('/', function(req, res) {
  res.json({ message: 'hurray! welcome to our API!' });
});

//on routes that end in /rats
router.route('/rats')
  //create a bear (accessed at POST /api/rats)
  .post(function(req, res) {
    const rat = new Rat(); //create a new instance of rat model
    rat.name = req.body.name; //assign name of rat with the data coming from the request

    //save rat and check for errors
    rat.save(function(err) {
      if (err)
        res.send(err);

      res.json({ mesage: 'Rat created!' });//implied else?
    });

  });

//REGISTER OUR ROUTES
//all of our routes will be prefixed with '/api'
app.use('/api', router);

//START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
