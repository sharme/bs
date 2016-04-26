var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();


/* GET home page. */
router.get('/', function(req, res) {
  console.log("Server path: routes/index/");

  client.get('user_name', function(err, reply){
    var user_name = reply;
    console.log("redis results: " + user_name);
    res.render('homepage', {title: 'Buybs', user_name: user_name});
  });
});

/* Step 1: register an account  */
router.get('/register', function (req, res) {
  res.render('register', {step: '1'});
});


router.get('/shops/:shop_name', function (req, res) {
  console.log('shop detail');
  res.render('shopDetail');
});


router.get('/logout', function(req, res) {
  console.log("index/logout");
  client.del('user_name', function(err, reply){
    console.log("logout: " + reply);
  });

  res.redirect('/');
});


module.exports = router;
