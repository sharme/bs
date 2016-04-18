var express = require('express');
var router = express.Router();

//create a MONGO CLIENT INSTANCE
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

router.get('/users', function(req, res){
    MongoClient.connect('mongodb://127.0.0.1:27017/buybs', function (err, db) {
        if (err) {
            throw err;
        } else {
            //authenticate database manage account with pwd
            db.authenticate("buybsOwner", "123456", function(err, response){
                db.collection('users').find(function(err, cursor) {
                    cursor.toArray(function (err, document) {
                        var users = document;
                        db.close();
                        res.json(users);
                    });
                });
            });
        }
    });
});


module.exports = router;
