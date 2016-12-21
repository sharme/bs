'use strict';

// load existing module controller instead of create a new one module('kanbaoController',[])
var kb = angular.module('ProfileController', []);


kb.controller('ProfileCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){
    
    $scope.selection = function(val){
        $scope.selectValue = val;
    };

    $http({method: 'GET', url: ipAddress + '/users/email/getUserById', params: {u_id: $cookies.get('u_id')}}).
        success(function(data){
        $scope.user = data[0];
    }, function(error){
        $scope.error = error;
    });
    
    $scope.logout = function() {
        console.log("remove cookies");
        $cookies.remove('u_name');
        $cookies.remove('u_id');
        $cookies.remove('u_avatar');
        $window.location.href = '#/';
        $window.location.reload();  
    };


    $scope.submit = function() {
        var req = {
            method: 'POST',
            url: ipAddress + '/users/email/edit',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.user)
        };

        $http(req).success(function(result){
            if(result.errno){
                $('.validation_msg').html('添加失败, 再尝试一次');
            } else {
                $('.validation_msg').html('添加成功');
            }
        });
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
        form_data.append('u_id', $cookies.get('u_id'));
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
                console.log('successfully uploaded, URL: ' + res.smallImg);
                $(file).parent().css("min-height", '0px');
                $('.picture-present' + num).attr('src', res.smallImg);
                if(num == 0) $scope.user.u_avatar = res.smallImg;
                $(file).css("display", "none");
                $('.fileUpload' + num).css("display", 'none');
            },
            error: function(res) {
                $('#myBar'+ num).text('上传失败!');
            }
        });
    };



    

}]);

kb.controller('StoneListCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){
    
    $http({method: 'GET', url: ipAddress + '/stones/getStonesByUID', params: {u_id: $cookies.get('u_id')}}).
    success(function(data){
        $scope.stones = data;
    }, function(error){
        $scope.error = error;
    });
    
}]);


kb.controller('MessagesCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){

    $http({method: 'GET', url: ipAddress + '/messages/getMessagesByUName', params: {u_name: $cookies.get('u_name')}}).
    success(function(data){
        $scope.messages = data;
    }, function(error){
        $scope.error = error;
    });

    $scope.replyMsg = function(to) {
        $('.messenger').css('display','block');
        $scope.toMessenger = to;
        $('.messenger-title-to').html($scope.toMessenger);
        console.log(to);
    };

    $scope.closeMessenger = function() {
        $('.messenger').css('display','none');
    };

}]);


kb.controller('StoneCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){

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
        form_data.append('u_id', $cookies.get('u_id'));
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
                if(num == 0) {$scope.stone.s_pic = res.bigImg; $scope.stone.s_present = res.smallImg}
                if(num == 1) $scope.stone.s_pic_2 = res.bigImg;
                if(num == 2) $scope.stone.s_pic_3 = res.bigImg;
                console.log($scope.stone);
                $(file).css("display", "none");
                $('.fileUpload' + num).css("display", 'none');
            },
            error: function(res) {
                $('#myBar'+ num).text('上传失败!');
            }
        });
    };


    $scope.stone = {
        u_id: $cookies.get('u_id'),
        s_pic: '',
        s_pic_2: '',
        s_pic_3: '',
        s_pic_4: '',
        s_description: ''
    };

    $scope.submit = function() {
        var req = {
            method: 'POST',
            url: ipAddress + '/stones/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.stone)
        };

        $http(req).success(function(result){
            if(result.errno){
                $('.validation_msg').html('添加失败, 再尝试一次');
            } else {
                $('.validation_msg').html('添加成功');
            }
        });
    }



}]);