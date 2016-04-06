/**
 * Created by yao on 4/3/16.
 */

var express = require('express');
var app = express();


app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log('Got a GET request fro the homepage');
    res.send('Hello World');
});

app.post('/', function (req, res) {
    console.log('Got a POST request for the homepage');
    res.send('Hello World');
});

app.delete('/del_user', function (req, res) {
    console.log('GOT a DELETE request for /del_user');
    res.send('Hello World');
});

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log('GOT A GET request for /list_user');
    res.send('Page listing');
});


app.get('/yao*', function (req, res) {
    console.log('Got a GET request for /yao*');
    res.send('Page Pattern Match');
});



app.get('/index.html', function (req, res){
   res.sendFile( __dirname + "/" + "index.html");
});

app.get('/process_get', function (req, res) {

    //Prepare output in JSON format
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };


    console.log(response);
    res.end(JSON.stringify(response));


});




var server = app.listen(8081, function(){
   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);

});

