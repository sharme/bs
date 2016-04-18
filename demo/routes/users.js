var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();

// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });

//create a MONGO CLIENT INSTANCE
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;



/* GET users listing. */
router.get('/index', function(req, res) {
  console.log("users/index");
  res.render("index");
});


/* GET users listing. */
router.post('/login', urlencodeParser, function(req, res, next) {

  var results = false;

  var data = {
    "phoneNumber": req.body.phoneNumber,
    "password": req.body.password
  };
  
  console.log("body: " + JSON.stringify(req.body) + " data: " + JSON.stringify(data));

  MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
    if (err) {
        throw err;
    } else {
      //authenticate database manage account with pwd
      db.authenticate("buybsOwner", "123456", function(err, response){
        var collection = db.collection("users");

        collection.find(data, function(err, cursor){
          cursor.count(err, function(err, count){
            console.log("Total matches: " + count);
            if( count > 0) {
              results = true;
              cursor.toArray(function(err, document){

                client.set('user_name', document[0].username);
                client.expire('user_name', 30 * 60);  // expiration time of 30 * 60 seconds.
                console.log("mongodb data: " + document[0].username);

                db.close();
                res.send(results);
              });
            }
            else {
              results = false;
              res.send(results);
              db.close();
            }
            // close database right after everything is completed.

          });
        });
      });
    }
  });

});



// /* Step 1: create a user */
router.post('/register_user', urlencodeParser, function(req, res, next) {

  console.log('registration step 2');

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
          console.log("Error: " + err);
          collection.count(function (err, count) {
            console.log(format("Users count = %s", count));
            console.log("error: " + err);
            db.close();
          })
        });
      });
    }

  });

  //render registration step 2
  res.render('register', { step: '2' });

});

// Step 2: collection shop info and product images
router.post('/register_shop', urlencodeParser, function(req, res, next){

  /**
   * db.shops.insert({
   * "_id": "2",
   * "shop_name": "宝石全球购",
   * "shop_type": "微店",
   * "shop_address": "上海虹口区大连西路201弄406",
   * "sells": "蓝宝石,钻石",
   * images:{
   *  image1:{"url": "/images/test1", "price": "99.99", "desc": "first image"},
   *  image2: {"url":"/images/test2", "price": "48.00", "desc": "second image"}}
   *  })
   * @type {{}}
     */
  var data = {
    shop_name: req.body.shopName,
    shop_type: req.body.shopType,
    shop_address: req.body.shopAddress,
    sells: req.body.sells,
    images:{
      image1: {
        url: req.body.imageName1,
        price: req.body.imagePrice1,
        desc: req.body.shopDescription1
      }
    }

  };



  MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
    if (err) {
      throw err;
    } else {
      //authenticate database manage account with pwd
      db.authenticate("buybsOwner", "123456", function(err, res){
        var collection = db.collection('shops');
        collection.insert(data, function(err, docs){
          console.log("Error: " + err);
          collection.count(function (err, count) {
            console.log(format("shop count = %s", count));
            console.log("error: " + err);
            db.close();
          })
        });
      });
    }

  });


  console.log('Registration step 3' + "data: " + JSON.stringify(data));
  //render registration step 3
  res.render('register', { step: '3'});
});





module.exports = router;
