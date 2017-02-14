'use strict';


var mc = angular.module('xw');

var ipAddress = 'http://127.0.0.1:8080';
mc.controller('manageCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

    $scope.selection = function(val){
        $scope.selectValue = val;
    };
    
    var progress = 1;
    var progressBar = function(num){
        progress += 1;
        if(progress < 99) {
            $('#myBar' + num).width(progress + "%");
            $('#myBar' + num).text(progress + "%");
        } else {
            clearInterval(progressBar(num));
        }
    };

    $scope.uploadFile = function(file, num) {

        setInterval(progressBar(num), 20);
        var file_data = $(file).prop('files')[0];
        var form_data = new FormData();
        form_data.append('u_id', 1);
        form_data.append("file", file_data);

        $.ajax({
            url: ipAddress + "/api/uploadPhotos",
            contentType: false,
            data: form_data,
            processData: false,
            cache: false,
            type: "POST",
            success: function (res) {
                $('#myBar' + num).width("100%");
                $('#myBar' + num).text('上传完成!');
                console.log('successfully uploaded, URL: ' + res.bigImg);
                $(file).parent().css("min-height", '0px');
                $('.picture-present' + num).attr('src', res.bigImg);
                if(num == 0) {$scope.product.p_img = res.bigImg;$scope.product.p_smallImg=res.smallImg;}
                console.log($scope.product);
                $(file).css("display", "none");
                $('.fileUpload' + num).css("display", 'none');
            },
            error: function(res) {
                $('#myBar'+ num).text('上传失败!');
            }
        });
    };


    $scope.product = {
        p_description: '',
        p_contents: '',
        p_img: '',
        p_smallImg: ''
    };

    $scope.submit = function() {
        var req = {
            method: 'POST',
            url: ipAddress + '/products/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.product)
        };

        $http(req).success(function(result){
            if(result.errno){
                $('.validation_msg').html('添加失败, 再尝试一次');
            } else {
                $('.validation_msg').html('添加成功');
                // window.location.href = "#/";
            }
        });
    };



    $http({method: 'GET', url: ipAddress + '/products/getProducts'})
        .success(function(data){
            $scope.products = data;
        }, function(error){
            $scope.error = error;
        });

}]);