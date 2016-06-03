var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'jk'
});

connection.connect();


router.post('/add', function(req, res, next) {
    var addSQL = mysql.format("insert into jk_followers(u_id,fl_fl_id,fl_create_time,fl_update_time) values (?,?,default,default)",[req.body.u_id, req.body.fl_fl_id]);

    connection.query(addSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});







module.exports = router;