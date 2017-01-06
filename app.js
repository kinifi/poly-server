// BASE SETUP
// =============================================================================
//api overview:
// /api/players/:count_num - get - get all the players
// /api/player - post - create a player to the database with its score
// /api/players/:player_name - get  - a single player
// /api/players/:player_name - put - update a player with new info
// /api/players/:player_name - delete - delete a new player


// call the packages we need
var express         = require('express');        // call express
var app             = express();                 // define our app using express
var bodyParser      = require('body-parser');
var httpProxy       = require('http-proxy');

//setup the database
var fs              = require("fs");
var Engine          = require('tingodb')();
var database        = new Engine.Db(__dirname + '/db',{});
//the leaderboard database
//this is the first leaderboard we created
var firstleaderboard = database.collection('firstleaderboard');

//set up the repo limit
var RateLimit       = require('express-rate-limit');

var apiLimiter = new RateLimit({
  windowMs: 60*60*1000, // 1 hour window
  // delayAfter: 1, // begin slowing down responses after the first request
  delayMs: 0, // disabled
  max: 100, // start blocking after 5 requests
  message: "Too many accounts created from this IP, please try again after an hour"
});

//use this is on heroku
app.enable('trust proxy');

// only apply to requests that begin with /api/
app.use('/api/', apiLimiter);



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
 // get an instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging or extra things here
    // console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
//(accessed at GET http://localhost:8080/api)

//add a player to the database with its score
router.route('/player').post(function(req, res) {

    //get the data we need and store it
    var newPlayer = req.body.name;
    var newPlayerScore = req.body.score;
    // console.log(newPlayer, newPlayerScore);

    //insert the data into the database
    firstleaderboard.insert({
      'player' : newPlayer,
      'score' : Number(newPlayerScore)
    }, function(err, result) {
        //if error send the error message
        if(err){
          console.log(err);
          res.json({ message: 'error saving score', error: err});
        }
        else {
          //no error so send them the success message
          //send the whole result so they can save the ID locally if needed
          res.json({ message: 'success', result: result});
        }
    });

  });

///api/players/:count_num - get top players score specified by language
router.route('/players/:count_num').get(function(req, res) {

  //how many leaderboard values do you want?
  var theCount = Number(req.params.count_num);

  //search the database for the score and return it in json format
  firstleaderboard
  	.find()
    .sort({'score': -1})
  	.limit(theCount)
  	.toArray(function(err,results){

      //check if we have any errors first
      if(err){
        //send the error
        res.json({ message: 'error getting scores', error: err});
      }
      if(results) {
        //send the values back
        res.json(results);
      }
      else {
        res.json({ message: 'error getting player_name', error: 'no results'});
      }

  	});
});

// /api/player/:player_name - get  - a single player
router.route('/player/:player_name').get(function(req, res) {

  //how many leaderboard values do you want?
  var playerName = req.params.player_name;

  //search the database for the score and return it in json format
  firstleaderboard
  	.find({'player': playerName})
  	.toArray(function(err,results) {
      //check if we have any errors first
      if(err){
        //send the error
        res.json({ message: 'error getting player_name', error: err});
      }

      if(results){
        //send the values back
        res.json(results[0]);
      }
      else {
        res.json({ message: 'error getting player_name', error: 'no results'});
      }

  	});

});

// /api/player/:player_name - put  - update the score
router.route('/player/:player_name/:player_score').put(function(req, res) {

  //how many leaderboard values do you want?
  var playerName = req.params.player_name;
  //get the new player score
  var playerScore = Number(req.params.player_score);

  firstleaderboard.update(
    {player: playerName},
    {$set: { score: playerScore}
  }, function (err, result){

      if(err){
        //send the error
        res.json({ message: 'error update player_score', error: err});
      }

      if(result){
        //send the values back
        res.json({ message: 'success'});
      }


  });

});

// /api/player/:player_name - delete  - update the score
router.route('/player/:player_name').delete(function(req, res) {

  //how many leaderboard values do you want?
  var playerName = req.params.player_name;

  firstleaderboard.remove({
    player: playerName
  }, function (err, result) {

      if(err){
        //send the error
        res.json({ message: 'error deleting player', error: err});
      }

      if(result){
        //send the values back
        res.json({ message: 'success'});
      }

  });

});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://localhost:8080'}).listen(9000); // See (†)

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('listening at http://localhost:' + port);
console.log('proxy at port: 9000');
