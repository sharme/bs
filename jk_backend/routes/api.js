var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');
var qiniu = require("qiniu");
var busboy = require('connect-busboy');
var easyimg = require('easyimage');
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

        var originalFolderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/original/" + folder;
        var smallFolderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/small/" + folder;
        var bigFolderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/big/" + folder;


        fs.exists(originalFolderPath, function(result){
            if(result) {
                fstream = fs.createWriteStream(originalFolderPath + "/" + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    fs.exists(smallFolderPath, function(result){
                        if(result) {
                            resize(filename, folder, smallFolderPath, originalFolderPath, bigFolderPath, 286, res);
                        } else {
                            fs.mkdir(smallFolderPath, 0777, function(result){
                                if(result){
                                    resize(filename, folder, smallFolderPath, originalFolderPath, bigFolderPath, 286, res);
                                } else {
                                    console.log(result);
                                }
                            });
                        }
                    });

                });
            } else {
                fs.mkdir(originalFolderPath, 0777, function(result){
                   if(result){
                       fstream = fs.createWriteStream(originalFolderPath + "/" + filename);
                       file.pipe(fstream);
                       fstream.on('close', function () {
                           fs.exists(smallFolderPath, function(result){
                               if(result) {
                                   resize(filename, folder, smallFolderPath, originalFolderPath, bigFolderPath, 286, res);
                               } else {
                                   fs.mkdir(smallFolderPath, 0777, function(result){
                                       if(result){
                                           resize(filename, folder, smallFolderPath, originalFolderPath, bigFolderPath, 286, res);
                                       } else {
                                           console.log(result);
                                       }
                                   });
                               }
                           });
                       });
                   } else {
                      console.log(result);
                   }
                });
            }
        });

    });
});


// Upload file and response back.
router.post('/uploadAvatar', function(req, res) {

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

        var originalFolderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/original/" + folder;
        var miniFolderPath = __dirname.substr(0, __dirname.length - 7) + "/public/images/mini/" + folder;


        fs.exists(originalFolderPath, function(result){
            if(result) {
                fstream = fs.createWriteStream(originalFolderPath + "/" + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    fs.exists(miniFolderPath, function(result){
                        if(result) {
                            resize(filename, folder, miniFolderPath, originalFolderPath, null, 80, res);
                        } else {
                            fs.mkdir(miniFolderPath, 0777, function(result){
                                if(result){
                                    resize(filename, folder, smallFolderPath, originalFolderPath, null, 80, res);
                                } else {
                                    console.log(result);
                                }
                            });
                        }
                    });

                });
            } else {
                fs.mkdir(originalFolderPath, 0777, function(result){
                    if(result){
                        fstream = fs.createWriteStream(originalFolderPath + "/" + filename);
                        file.pipe(fstream);
                        fstream.on('close', function () {
                            fs.exists(miniFolderPath, function(result){
                                if(result) {
                                    resize(filename, folder, miniFolderPath, originalFolderPath, null, 80, res);
                                } else {
                                    fs.mkdir(miniFolderPath, 0777, function(result){
                                        if(result){
                                            resize(filename, folder, miniFolderPath, originalFolderPath, null, 80, res);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                }
                            });
                        });
                    } else {
                        console.log(result);
                    }
                });
            }
        });

    });
});













function updateSmallFileQiniu (small, smallPath, big, bigPath, res) {
    //构建上传策略函数
    function uptoken(bucket, small) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+small);
        return putPolicy.token();
    }

    //生成上传 Token
    token = uptoken(bucket, small);

    //要上传文件的本地路径
    filePath = smallPath;

    //构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key, ret.persistentId);
              
                
                if(big == null || bigPath == null){
                    res.send("http://o99spo2ev.bkt.clouddn.com/" + key);
                } else {
                    updateBigFileQiniu(big, bigPath, res, "http://o99spo2ev.bkt.clouddn.com/" + key);
                }

            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }

//调用uploadFile上传
    uploadFile(token, small, filePath);

}

function updateBigFileQiniu (key, path, res, smallImg) {
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
                
                var data = {
                    "bigImg": "http://o99spo2ev.bkt.clouddn.com/" + key,
                    "smallImg": smallImg
                };
                
                console.log('uploaded = ' + JSON.stringify(data));
                
                res.send(data);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }

//调用uploadFile上传
    uploadFile(token, key, filePath);

}


function resize(filename, folder, smallFolderPath, originalFolderPath, bigFolderPath, size, res) {
    
    if(smallFolderPath != null && bigFolderPath != null) {

        easyimg.resize({
            src: originalFolderPath + "/" + filename, dst: bigFolderPath + "/" + filename, width: 680
        }).then(
            function (image) {
                console.log('resize Big image: ' + image.width);
               
                easyimg.resize({
                    src: bigFolderPath + "/" + filename, dst: smallFolderPath + "/" + filename, width: size
                }).then(
                    function (image) {
                        console.log('resize small image: ' + image.width);

                        updateSmallFileQiniu("images/small/" + folder + "/" + filename, smallFolderPath + "/" + filename, "images/big/" + folder + "/" + filename, bigFolderPath + "/" + filename, res);

                    }
                );
            }
        );
    } else if(smallFolderPath != null && bigFolderPath == null) {
        easyimg.resize({
            src: originalFolderPath + "/" + filename, dst: smallFolderPath + "/" + filename, width: size
        }).then(
            function (image) {
                console.log('resize mini image: ' + image.width);
                
                updateSmallFileQiniu("images/mini/" + folder + "/" + filename, smallFolderPath + "/" + filename, null, null, res);

            }
        );
    }


}




module.exports = router;
