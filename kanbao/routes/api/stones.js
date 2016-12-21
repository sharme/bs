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
router.get('/getStonesByUID', function(req, res, next){

    if(req.param('u_id')){
        var sql = mysql.format('select * from kb_stones where u_id = ?', req.param('u_id'));
        connection.query(sql, function (err, result) {
            if(err){
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
});

router.get('/getStones', function(req, res, next){
        var sql = mysql.format('select kbs.*,(select u_name from kb_users as kbu where kbu.u_id=kbs.u_id) as u_name, (select u_avatar from kb_users as kbu where kbu.u_id=kbs.u_id) as u_avatar from kb_stones as kbs;');
        connection.query(sql, function (err, result) {
            if(err){
                res.send(err);
            } else {
                res.send(result);
            }
        });
});


router.post('/add', urlEncodeParser, function(req, res, next){
    var sql = 'insert into kb_stones(u_id, s_present, s_pic, s_pic_2, s_pic_3, s_pic_4, s_description, s_updated_time, s_created_time) values(?,?,?,?,?,?,?,?,?)';
    var values = [req.body.u_id, req.body.s_present, req.body.s_pic, req.body.s_pic_2, req.body.s_pic_3, req.body.s_pic_4, req.body.s_description, date, date];
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


