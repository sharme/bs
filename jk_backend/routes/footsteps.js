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


router.get('/getFootsteps', function(req, res, next) {

    var criteriaSQL = "select fs_id,u_id,fs_pic,fs_des,fs_from," +
        "(select count(*) from jk_sticks as jks where jks.fs_id = jkf.fs_id) as sticks," +
        "(select count(*) from jk_likes as jkl where jkl.fs_id = jkf.fs_id) as likes," +
        "(select (select u_avatar from jk_users as jku where jku.u_id = jkc.u_id) from jk_comments as jkc limit 1) as u_avatar," +
        "(select (select u_name from jk_users as jku where jku.u_id = jkc.u_id) from jk_comments as jkc limit 1) as u_name," +
        "(select cm_content from jk_comments as jkc where jkc.fs_id = jkf.fs_id limit 1) as cm_content" +
        " from jk_footsteps as jkf";

    console.log(req.param('fs_from'));

    if(req.param('fs_from')){
        criteriaSQL += " where jkf.fs_from='" + req.param('fs_from') + "'";
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



router.get('/getFootstepsByUID', function(req, res, next) {
    var criteriaSQL = mysql.format("select fs_id,u_id,fs_pic,fs_des," +
        "(select count(*) from jk_sticks as jks where jks.fs_id = jkf.fs_id) as sticks," +
        "(select count(*) from jk_likes as jkl where jkl.fs_id = jkf.fs_id) as likes," +
        "(select (select u_avatar from jk_users as jku where jku.u_id = jkc.u_id) from jk_comments as jkc limit 1) as u_avatar," +
        "(select (select u_name from jk_users as jku where jku.u_id = jkc.u_id) from jk_comments as jkc limit 1) as u_name," +
        "(select cm_content from jk_comments as jkc where jkc.fs_id = jkf.fs_id limit 1) as cm_content" +
        " from jk_footsteps as jkf where jkf.u_id = ?;",[req.param('u_id')]);

    connection.query(criteriaSQL, function(err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});

router.get('/getSticksByUID', function(req, res, next) {
    var criteriaSQL = mysql.format("select fs_id,u_id,fs_pic,fs_des," +
        "(select count(*) from jk_sticks as jks where jks.fs_id = jkf.fs_id) as sticks," +
        "(select count(*) from jk_likes as jkl where jkl.fs_id = jkf.fs_id) as likes," +
        "(select (select u_avatar from jk_users as jku where jku.u_id = jkc.u_id) from jk_comments as jkc limit 1) as u_avatar," +
        "(select (select u_name from jk_users as jku where jku.u_id = jkc.u_id) from jk_comments as jkc limit 1) as u_name," +
        "(select cm_content from jk_comments as jkc where jkc.fs_id = jkf.fs_id limit 1) as cm_content" +
        " from jk_footsteps as jkf where jkf.fs_id IN (select fs_id from jk_sticks as jks where jks.u_id = ?);",[req.param('u_id')]);

    connection.query(criteriaSQL, function(err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});

router.post('/create', function(req, res, next) {
    var createSQL = mysql.format("insert into jk_footsteps(fs_pic,fs_des,fs_from,u_id,fs_create_time,fs_update_time) values(?,?,?,?,default,default)", [req.body.picture, req.body.description,req.body.from,req.body.u_id]);

    connection.query(createSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});


router.get('/getFootstepsDetail', function (req, res, next) {
   var criteriaSQL = mysql.format("select fs_id,fs_des,fs_pic," +
       "(select count(*) from jk_comments as jkc where jkc.fs_id = jkf.fs_id) as comments," +
       "(select count(*) from jk_sticks as jks where jks.fs_id = jkf.fs_id) as sticks," +
       "(select u_name from jk_users as jku where jku.u_id = jkf.u_id) as u_name," +
       "(select u_slogan from jk_users as jku where jku.u_id = jkf.u_id) as u_slogan from jk_footsteps as jkf where jkf.fs_id = ?", [req.param('fs_id')]);

    connection.query(criteriaSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })


});







module.exports = router;