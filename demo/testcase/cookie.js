/**
 * Created by yao on 4/4/16.
 */

var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());


app.get('/', function (req, res){
    console.log('Cookies: ', req.cookies);
});

app.listen(8081);

