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

/* GET home page. */
var approve;
router.get('/index', function(req, res, next) {

  var secret = req.param("secret");

  if(secret == '123456qwertyuiop') {

    var sql = "select fs_id, fs_status,fs_smallImg, fs_des, fs_from, fs_create_time from jk_footsteps";
    connection.query(sql, function (err, result) {
      approve = result;
    });

    res.render('index', {title: '有图后台', result: approve});
  } else {
    res.render('error');
  }
});

router.get('/pictures', function(req, res, next) {

  var sql = "select pc_bigImg as url from jk_pictures where u_id=" + req.param('u_id');

  var obj;
  var sqlRe;
  connection.query(sql, function(err, result) {

    sqlRe = result;
    res.send(sqlRe);
  });
  
});



module.exports = router;
