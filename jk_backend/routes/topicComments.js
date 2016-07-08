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
    var addSQL = mysql.format("insert into jk_topics_comments(tp_id,u_id,tp_cm_to,tp_cm_content,tp_cm_create_time) values (?,?,?,?,default)",[req.body.tp_id, req.body.u_id,req.body.tp_cm_to,req.body.tp_cm_content]);

    connection.query(addSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});


router.get('/getCommentsByTPID', function (req, res, next) {
    var criteriaSQL = mysql.format("select (select u_avatar from jk_users as jku where jku.u_id = jktc.u_id) as u_avatar, (select u_name from jk_users as jku where jku.u_id = jktc.u_id) as u_name, tp_cm_content, tp_cm_create_time from jk_topics_comments as jktc where jktc.tp_id = ?", [req.param('tp_id')]);

    connection.query(criteriaSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});







module.exports = router;