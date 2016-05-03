var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });
//create a MONGO CLIENT INSTANCE
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


router.get('/getShops', function(req, res){
    MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
        if (err) {
            throw err;
        } else {
            //authenticate database manage account with pwd
            db.authenticate("buybsOwner", "123456", function(err, response){
                db.collection('shops').find(function(err, cursor) {
                        cursor.toArray(function (err, document) {
                            var shop = document;
                            db.close();
                            res.json(shop);
                        });
                });
            });
        }
    });
});

router.get('/getShops/:shopId', function(req, res){
    
    // var data = {"_id": req.params.shopId};
    var data = {"shop_name": req.params.shopId};
    console.log('getShops/shopId/data:' + JSON.stringify(data));
    MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
        if (err) {
            throw err;
        } else {
            //authenticate database manage account with pwd
            db.authenticate("buybsOwner", "123456", function(err, response){
                db.collection('shops').find(data, function(err, cursor) {
                    cursor.toArray(function (err, document) {
                        var shop = document;
                        db.close();
                        res.json(shop);
                    });
                });
            });
        }
    });
});

router.post('/create', urlencodeParser, function(req, res, next){

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

    console.log("data: " + JSON.stringify(req.body));
    
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
            db.authenticate("buybsOwner", "123456", function(err, result){
                var collection = db.collection('shops');
                collection.insert(data, function(err, docs){
                    console.log("Error: " + err);
                    collection.count(function (err, count) {
                        console.log(format("shop count = %s", count));
                        console.log("error: " + err);
                        db.close();
                        res.send(true);
                    })
                });
            });
        }

    });

});


module.exports = router;