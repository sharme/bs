var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });

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

router.post('/create', urlencodeParser, function(req, res, next) {

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
            db.authenticate("buybsOwner", "123456", function(err, result){
                var collection = db.collection('users');
                collection.insert(data, function(err, docs){
                    console.log("Error: " + err);
                    collection.count(function (err, count) {
                        console.log(format("Users count = %s", count));
                        console.log("error: " + err);
                        db.close();
                        res.send(true);
                    })
                });
            });
        }
    });

});

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
                                console.log("mongodb data: " + document[0].username);
                                db.close();
                                res.send(document[0].username);
                            });
                        }
                        else {
                            results = '';
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


module.exports = router;
