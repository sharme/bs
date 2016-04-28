var express = require('express');
var router = express.Router();
var app = express();



var fs = require('fs');
var busboy = require('connect-busboy');
router.use(busboy());

// Upload file and response back.
router.post('/uploadPhotos', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Upload data: " + JSON.stringify(file));
        filename = "test" + fileAuto() + filename.substr(filename.lastIndexOf("."));
        var path = __dirname.substr(0, __dirname.length - 15) + "/public/images/" + filename;
        console.log("path= " + path + " ; __dirname= " +  __dirname);

        fstream = fs.createWriteStream(path);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send("http://127.0.0.1:8081/images/" + filename);
        });
    });
});

var auto = 1;
function fileAuto () {
   return auto ++;
}




module.exports = router;
