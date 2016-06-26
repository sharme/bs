var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');
var qiniu = require("qiniu");
var busboy = require('connect-busboy');
router.use(busboy());

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'WhCKNGaKMNqjMVvnOeq2lidyIlKMvFCqrTAambLK';
qiniu.conf.SECRET_KEY = 'UD6-wbVzrrtmg9hbzd6qQyltumTAqAG75kogznxw';

//要上传的空间
bucket = 'foot';

//上传到七牛后保存的文件名
key = 'my-nodejs-logo.png';



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
        filename = new Date().getTime() + filename.substr(filename.lastIndexOf("."));
        var folderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/" + folder;
        var path = __dirname.substr(0, __dirname.length - 7) + "/public/images/" + folder + "/" + filename;
        console.log("path= " + path + " ; __dirname= " +  __dirname);
        key = "images/" + folder + "/" + filename;
        fs.exists(folderPath, function(result){
            if(result) {
                fstream = fs.createWriteStream(path);
                file.pipe(fstream);
                fstream.on('close', function () {
                    updateFileQiniu(key, path, res);

                });
            } else {
                fs.mkdir(folderPath, 0777, function(result){
                   if(result){
                       fstream = fs.createWriteStream(path);
                       file.pipe(fstream);
                       fstream.on('close', function () {
                           updateFileQiniu(key, path, res);
                       });
                   } else {
                      console.log(result);
                   }
                });
            }
        });

    });
});






function updateFileQiniu (key, path, res) {
    //构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }

//生成上传 Token
    token = uptoken(bucket, key);

//要上传文件的本地路径
    filePath = path;

//构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key, ret.persistentId);
                res.send("http://o99spo2ev.bkt.clouddn.com/" + key);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }

//调用uploadFile上传
    uploadFile(token, key, filePath);

}




module.exports = router;
