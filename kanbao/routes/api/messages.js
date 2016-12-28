var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
router.get('/getMessagesByUName', function(req, res, next){

    if(req.param('u_name')){
        var sql = mysql.format('select * from kb_messages where m_to = ?', req.param('u_name'));
        connection.query(sql, function (err, result) {
            if(err){
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
});


router.post('/updateMessageStatus', function(req, res, next){

    if(req.body.m_id) {
        var sql = mysql.format('update kb_messages set m_status= 0 where m_id = ? ', req.body.m_id);
        console.log("update: " + sql);
        connection.query(sql, function(err, result){
           if(err) {
               res.send(err);
           } else {
               res.send(result);
           }
        });
    }
});



router.post('/add', urlEncodeParser, function(req, res, next){
    var sql = 'insert into kb_messages(m_sender, m_msg, m_to, m_status, m_created_time) values(?,?,?,?,?)';
    var values = [req.body.m_sender, req.body.m_msg, req.body.m_to, 1, date];
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


