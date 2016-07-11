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
    var addSQL = mysql.format("insert into jk_topics_clicks(tp_id,u_id,tp_ck_create_time) values (?,?,default)",[req.body.tp_id, req.body.u_id]);

    connection.query(addSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});

router.get('/search', function(req, res, next) {
    var searchSQL = mysql.format("select count(*) as clicks from jk_topics_clicks where tp_id = ?;", [req.param('tp_id')]);

    connection.query(searchSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});

router.get('/topUsers', function(req, res, next) {
    var searchSQL = "select count(u_id), (select u_avatar from jk_users as jku where jku.u_id=jktc.u_id) as u_avatar,(select u_name from jk_users as jku where jku.u_id=jktc.u_id) as u_name from jk_topics_clicks as jktc group by u_id asc limit 5;";

    connection.query(searchSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});







module.exports = router;