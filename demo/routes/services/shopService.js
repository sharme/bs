var express = require('express');
var router = express.Router();

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

router.get('/getShop/:shop_name', function(req, res){
    
    var data = {"shop_name": req.params.shop_name};
    
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






module.exports = router;