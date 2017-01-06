//set up the repo limit
var RateLimit = require('express-rate-limit');


module.exports = {

  //use this is on heroku
  // app.enable('trust proxy');


  //Create as many of these as you want and pass them into different get,put,delete routes in app.js
  //example:
  // app.post('/create-account', createAccountLimiter, function(req, res) {
  //   //...
  // });
  //create an api limiter
  var apiLimiter = new RateLimit({
    windowMs: 60*60*1000, // 1 hour window
    // delayAfter: 1, // begin slowing down responses after the first request
    delayMs: 0, // disabled
    max: 100, // start blocking after 5 requests
    message: "Too many accounts created from this IP, please try again after an hour"
  });

}
