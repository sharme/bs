var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'fm@youtumi',
    database: 'jk'
});

var date = new Date();

connection.connect();


router.post('/add', function(req, res, next) {
    
    var addSQL = mysql.format("insert into jk_tag_footsteps(tg_id,fs_id,tf_create_time) values (?,?,?)",[req.body.tg_id, req.body.fs_id,date]);
    connection.query(addSQL, function (err, result) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});




module.exports = router;
