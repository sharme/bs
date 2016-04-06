var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });





/* GET users listing. */
router.get('/', function(req, res) {
  res.send('you are here, respond with a resource');
});




// /* Insert user */
router.post('/register_submit', urlencodeParser, function(req, res, next) {

  var data = {
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    scCode: req.body.scCode,
    agreement: "checked"
  };

  console.log("Register form_submit data: " + JSON.stringify(data));

  MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
    if (err) {
      throw err;
    } else {
      //authenticate database manage account with pwd
      db.authenticate("buybsOwner", "123456", function(err, res){
        var collection = db.collection('users');
        collection.insert(data, function(err, docs){
          console.log("insert: " + err);
          collection.count(function (err, count) {
            console.log(format("Users count = %s", count));
            console.log("error: " + err);
            db.close();
          })
        });
      });
    }

  });

  //render register successfully page
  res.render('register', { succeed: 'true' });

});





module.exports = router;
