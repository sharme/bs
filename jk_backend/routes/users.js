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

connection.connect();

var date = new Date();

/* GET users listing. */
router.get('/getUsers', function(req, res, next) {
  connection.query('select * from jk_users', function (err, rows, fields) {
    if(err) {
      res.send(err);
    } else {
      console.log('Username is: ' + rows[0].u_name);
      // connection.end();
      res.send(rows);
    }
  });
});


router.get('/getUserById', function(req, res, next) {
  var criteriaSQL = mysql.format('select * from jk_users where u_id = ?', req.param('u_id'));
  connection.query(criteriaSQL, function (err, rows, fields) {
    if(err) {
      res.send(err);
    } else {
      console.log('Username is: ' + rows[0].u_name);
      // connection.end();
      res.send(rows);
    }
  });
});


router.get('/getUserDetail', function(req, res, next) {
  console.log(req.param('u_id'));
  
  var criteriaSQL = mysql.format("select u_id," +
      " u_name,(select count(*) from jk_footsteps as jkf where jkf.u_id = jku.u_id) as footsteps," +
      "(select count(*) from jk_sticks as jks where jks.u_id = jku.u_id) as sticks," +
      "(select count(*) from jk_followers as jkf where jkf.fl_fl_id = jku.u_id) as follows," +
      "(select count(*) from jk_followers as jkf where jkf.u_id = jku.u_id) as fans from jk_users as jku where jku.u_id = ?",[req.param('u_id')]);
  
  connection.query(criteriaSQL, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/create', urlencodeParser, function(req, res, next) {
  var createSQL = "insert into jk_users(u_phone_num,u_pwd,u_name,u_status,u_link,u_create_time,u_update_time) values (?,?,?,1,?,?,?)";
  var inserts = [req.body.phoneNumber, req.body.password, req.body.username,"www.buybs.com/"+ req.body.username,date,date];
  createSQL = mysql.format(createSQL, inserts);
  console.log(createSQL);
  connection.query(createSQL, function (err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/login', urlencodeParser, function(req,res, next) {
  var criteriaSQL = mysql.format("select * from jk_users where u_phone_num = ? and u_pwd = ?",[req.body.phoneNumber, req.body.password]);

  connection.query(criteriaSQL, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/update', urlencodeParser, function(req, res, next) {
  var updateSQL = mysql.format("update jk_users set u_name = ?, u_avatar = ?, u_link = ?, u_slogan = ? where u_id = ?",[req.body.u_name, req.body.u_avatar, req.body.u_link, req.body.u_slogan, req.body.u_id]);

  connection.query(updateSQL, function (err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/follow', function(req, res, next) {
  var followSQL = mysql.format("select u_id,u_name,u_avatar,u_link from jk_users as jku where jku.u_id in (select u_id from jk_followers as jkf where jkf.fl_fl_id = ?)",[req.param('u_id')]);

  connection.query(followSQL, function (err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});


router.get('/followers', function(req, res, next) {
  var followerSQL = mysql.format("select u_id,u_name,u_avatar,u_link from jk_users as jku where jku.u_id in (select fl_fl_id from jk_followers as jkf where jkf.u_id = ?)",[req.param('u_id')]);

  connection.query(followerSQL, function (err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});







module.exports = router;
