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


router.get('/getTopics', function(req, res, next) {

    var criteriaSQL = "select tp_id, (select u_name from jk_users jku where jku.u_id=jkt.u_id) as u_name,(select u_avatar from jk_users jku where jku.u_id=jkt.u_id) as u_avatar, (select count(*) from jk_topics_likes as jktl where jktl.tp_id=jkt.tp_id) as likes, tp_title, tp_content, tp_img, tp_update_time from jk_topics as jkt;";

    console.log(req.param('fs_about'));

    if(req.param('fs_about')){
        criteriaSQL += " where jkf.fs_from='" + req.param('fs_from') + "'";
    }

    if(req.param('index_start') && req.param('index_end')) {
        criteriaSQL += " limit " + req.param('index_start') + "," + req.param('index_end');
    }


    console.log(criteriaSQL);


    connection.query(criteriaSQL, function(err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});




router.get('/getTopicsNumber', function(req, res, next) {
    var criteriaSQL = "select count(*) as number from jk_topics;";

    connection.query(criteriaSQL, function(err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});


router.post('/create', function(req, res, next) {
    var createSQL = mysql.format("insert into jk_topics(u_id,tp_about,tp_content,tp_img,tp_title,tp_create_time,tp_update_time) values(?,?,?,?,?,default,default)", [req.body.u_id, req.body.tp_about,req.body.tp_content,req.body.tp_img,req.body.tp_title]);

    connection.query(createSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});


router.get('/getFootstepsDetail', function (req, res, next) {
    var criteriaSQL = mysql.format("select tp_id, (select u_name from jk_users jku where jku.u_id=jkt.u_id) as u_name,(select u_avatar from jk_users jku where jku.u_id=jkt.u_id) as u_avatar, (select count(*) from jk_topics_likes as jktl where jktl.tp_id=jkt.tp_id) as likes, tp_title, tp_content, tp_img, tp_update_time from jk_topics as jkt where jkt.tp_id=?;", [req.param('tp_id')]);

    connection.query(criteriaSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })


});







module.exports = router;