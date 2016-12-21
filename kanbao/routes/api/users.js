var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var helper = require('./helper.js');
var bodyParser = require('body-parser');
//create application/x-www-form-urlencoded parser
var urlEncodeParser = bodyParser.urlencoded({ extended: false });


var connection = mysql.createConnection({
   host: '127.0.0.1',
    user: 'root',
    password: 'fm@youtumi',
    database: 'kb'
});

connection.connect();

var date = new Date(); // new current date.

/*    Public APIs            */
router.get('/getUserById', function(req, res, next){

    if(req.param('u_id')){
        var sql = mysql.format('select * from kb_users where u_id = ?', req.param('u_id'));
        connection.query(sql, function (err, result) {
           if(err){
               res.send(err);
           } else {
               res.send(result);
           }
        });
    }
});

router.get('/getUsers', function(req, res, next){
    
        var sql = mysql.format('select * from kb_users');
        connection.query(sql, function (err, result) {
            if(err){
                res.send(err);
            } else {
                res.send(result);
            }
        });
});


router.post('/login', urlEncodeParser, function (req, res, next) {
    
    var sql = mysql.format('select * from kb_users where u_email = ? and u_pwd = ?', [req.body.u_email, req.body.u_pwd]);
    connection.query(sql, function (err, result) {
        if(err){
            res.send(err);
        } else {
            if(result.length > 0) {
                res.send([{
                    u_id: result[0].u_id,
                    u_avatar: result[0].u_avatar,
                    u_name: result[0].u_name
                }]);
            } else {
                res.send(result);
            }
        }
    });
});

router.post('/create', urlEncodeParser, function(req, res, next){
   var sql = 'insert into kb_users(u_phone_num, u_email, u_name, u_pwd, u_status, u_updated_time, u_created_time) values(?,?,?,?,1,?,?)';
   var values = [null, req.body.u_email, req.body.u_name, req.body.u_pwd, date, date];
   sql = mysql.format(sql,values);
    console.log(sql);
   connection.query(sql, function(err, result) {
      if(err){
          res.send(err);
      } else {

          connection.query("select u_id from kb_users where u_email='"+ req.body.u_email + "';", function(err, result){
              if(result.length > 0)
                  helper.initializationPicFolder(result[0].u_id);
          });
          
          res.send(result);
      }
   });

});

router.post('/edit', urlEncodeParser, function(req, res, next){
    var sql = 'update kb_users set u_phone_num = ?, u_slogan = ?, u_avatar = ?, u_email = ?, u_name = ?, u_description = ?, u_updated_time = ? where u_id = ? ';
    var values = [req.body.u_phone_num, req.body.u_slogan, req.body.u_avatar, req.body.u_email, req.body.u_name, req.body.u_description, date, req.body.u_id];
    sql = mysql.format(sql,values);
    console.log(sql);
    connection.query(sql, function(err, result) {
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });

});



module.exports = router;


