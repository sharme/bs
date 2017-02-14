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
  database: 'xw'
});

connection.connect();

var date = new Date();

router.get('/getProducts', function(req, res, next) {
  
  var criteriaSQL = "select p_id, p_img, p_smallImg, p_description, p_contents, p_created_time from products";
  criteriaSQL += " order by p_created_time desc";
  
  if(req.param('index_start') && req.param('count')) {
    criteriaSQL += " limit " + req.param('index_start') + "," + req.param('count');
  }

  console.log(criteriaSQL);
  connection.query(criteriaSQL, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});

router.get('/getProductByID', function(req, res, next) {

  var criteriaSQL = mysql.format("select p_id, p_img, p_smallImg, p_description, p_contents, p_created_time from products where p_id=?", req.param('p_id'));

  console.log(criteriaSQL);
  connection.query(criteriaSQL, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});


router.post('/create', function(req, res, next) {

  var createSQL = mysql.format("insert into products(p_img,p_contents,p_description,p_created_time,p_updated_time,p_smallImg) values(?,?,?,?,?,?)", [req.body.p_img, req.body.p_contents, req.body.p_description, date, date, req.body.p_smallImg]);
  console.log(createSQL);  
  connection.query(createSQL, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    })
});

router.get('/get', function(req, res, next) {

  var createSQL = mysql.format("select * from products");
  console.log(createSQL);
  connection.query(createSQL, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});



module.exports = router;
