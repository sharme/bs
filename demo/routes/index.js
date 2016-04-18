var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();


/* GET home page. */
router.get('/', function(req, res) {
  console.log("routes/index");
  var user_name = "";
  client.get('user_name', function(err, reply){
    user_name = reply;
    console.log("redis results: " + user_name);
    res.render('homepage', {title: 'Express', user_name: user_name});
  });
});

router.get('/register', function (req, res) {
  res.render('register', {step: '1'});
});


router.get('/logout', function(req, res) {
  console.log("index/logout");
  client.del('user_name', function(err, reply){
    console.log("logout: " + reply);
  });

  res.redirect('/');
});


module.exports = router;
