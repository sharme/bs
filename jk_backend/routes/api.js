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
    var folder = '';
    req.busboy.on('field', function(fieldname, val){
        folder = val;
        console.log(fieldname + ": " + folder);
    });
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Upload data: " + JSON.stringify(file) + ",folder = " + folder);
        filename = "jkImg" + fileAuto() + filename.substr(filename.lastIndexOf("."));
        var folderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/" + folder;
        var path = __dirname.substr(0, __dirname.length - 7) + "/public/images/" + folder + "/" + filename;
        console.log("path= " + path + " ; __dirname= " +  __dirname);

        fs.exists(folderPath, function(result){
            if(result) {
                fstream = fs.createWriteStream(path);
                file.pipe(fstream);
                fstream.on('close', function () {
                    res.send("http://localhost:3000/images/" + folder + "/" + filename);
                });
            } else {
                fs.mkdir(folderPath, 0777, function(result){
                   if(result){
                       fstream = fs.createWriteStream(path);
                       file.pipe(fstream);
                       fstream.on('close', function () {
                           res.send("http://localhost:3000/images/" + folder + "/" + filename);
                       });
                   } else {
                      console.log(result);
                   }
                });
            }
        });

    });
});

var auto = 1;
function fileAuto () {
   return auto ++;
}




module.exports = router;
