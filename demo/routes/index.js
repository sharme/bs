var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

//create a MONGO CLIENT INSTANCE
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

/* GET home page. */
router.get('/', function(req, res) {
  
  var user_name = "";
  client.get('user_name', function(err, reply){
    user_name = reply;
    console.log("redis results: " + user_name);

  var shop;

    MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
      if (err) {
        throw err;
      } else {
        //authenticate database manage account with pwd
        db.authenticate("buybsOwner", "123456", function(err, response){
          var collection = db.collection("shops");

          collection.find(function(err, cursor){
            cursor.count(err, function(err, count){
              console.log("Total matches: " + count);
              if( count > 0) {
                cursor.toArray(function(err, document){

                  // document.forEach(function(item){
                    // var temp = {
                    //   "shop_name": item.shop_name,
                    //   "shop_type": item.shop_type,
                    //   "shop_address": item.shop_address,
                    //   "sells": item.sells
                    // };

                    // shop = shop + temp;

                    // shop = shop + [{
                    //   "shop_name": item.shop_name,
                    //   "shop_type": item.shop_type,
                    //   "shop_address": item.shop_address,
                    //   "sells": item.sells
                    // }];


                  // });
                  shop = document;

                  //client.expire('user_name', 30 * 60);  // expiration time of 30 * 60 seconds.
                  console.log("mongodb data: " + document[0].shop_name + ", JSON: " + JSON.stringify(shop));

                  db.close();
                  res.render('homepage', { title: 'Express', user_name: user_name, shop: shop });
                  // res.send(results);
                });
              }
              else {
                // results = false;
                // res.send(results);
                console.log("couldn't found shop data from mongodb.");
                db.close();
                res.render('homepage', { title: 'Express', user_name: user_name, shop: shop });
              }
            });
          });
        });
      }
    });

  });

});




router.get('/register', function (req, res) {
  res.render('register', {step: '1'});
});


module.exports = router;
