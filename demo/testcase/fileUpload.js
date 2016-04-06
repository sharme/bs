/**
 * Created by yao on 4/4/16.
 */

var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(multer({ dest: './uploads/'}));


app.get('/upload.html', function (req, res) {
    res.sendfile( __dirname + '/fileUpload.html');
});


app.post('/file_upload', upload.array('photos', 12), function (req, res) {

    console.log("Files: " + req.files);

    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);

    var file = __dirname + "/" + req.files.file.name;
    fs.readFile( req.files.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if(err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files.file.name
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ));
        });
    });

});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});


