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


router.post('/add', function(req, res, next) {
    var addSQL = mysql.format("insert into jk_likes(fs_id,u_id,lk_create_time) values (?,?,default)",[req.body.fs_id, req.body.u_id]);

    connection.query(addSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {

            var addEvent = mysql.format("insert into jk_events(u_id,et_type,et_create_time) values (?,?,default)",[req.body.u_id, 'like']);
            connection.query(addEvent);
            
            res.send(result);
            
        }
    })
});

router.get('/search', function(req, res, next) {
   var searchSQL = mysql.format("select * from jk_likes where fs_id = ? and u_id = ?;", [req.param('fs_id'), req.param('u_id')]);

    connection.query(searchSQL, function (err, result) {
      if(err) {
          res.send("Error: " + err);
      } else {
          res.send(result);
      }
    })

});







module.exports = router;