/**
 * Created by yao on 4/4/16.
 */

var express = require('express');
var app = express();
var fs = require('fs');

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    })
});


// Add a user
user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
};

app.get('/adduser', function (req, res) {
    //First read existing users.
    fs.readFile( __dirname + '/users.json', 'utf8', function (err, data) {
        data = JSON.parse( data );
        data['user4'] = user['user4'];
        console.log( data );
        res.end( JSON.stringify( data ));
        // res.end( data );
    })
});


// show detail of the corresponding user.

app.get('/:id', function (req, res) {
    //First read existing users.
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        users = JSON.parse(data);
        var user = users['user' + req.params.id];
        console.log( user );
        res.end( JSON.stringify(user) );
    });
});


// Delete a user

app.get('/deleteUser/:id/:ide', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data['user' + req.params.id];

        console.log( data );
        res.end( JSON.stringify(data));

    })
});


var server = app.listen(8081, function () {
    
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
});

