'use strict';

var kb = angular.module('AccountController', []);
var ipAddress = 'http://localhost:3000';


kb.controller('LoginCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window){

    $scope.user = {
        u_email: '',
        u_pwd: ''
    };

    $scope.submit = function() {
        var req = {
            method: 'POST',
            url: ipAddress + '/users/email/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.user)
        };

        $http(req).success(function(result){
            if(result.errno){
                $('.validation_msg').html('登陆失败, 请联系管理员');
            } else {

                if(result.length > 0){
                    if (result[0].u_avatar) {
                        $(".header-account").html("<div class='user-avatar'><img title='" + result[0].u_name + "' class='user-avatar-img' src='" + result[0].u_avatar + "'></div>");
                        $cookies.put('u_avatar', result[0].u_avatar);
                    } else {
                        $(".header-account").html("<div class='user-avatar'><img title='" + result[0].u_name + "' class='user-avatar-img' src='../../images/icon/default_avatar.png'></div>");
                    }

                    $cookies.put('u_name', result[0].u_name);
                    $cookies.put('u_id', result[0].u_id);
                    $window.location.href = "#/profile";
                    $window.location.reload();

                } else {
                    $('.validation_msg').html('登陆失败, 密码或者用户名错误.');
                }

            }
        });
    }
}]);


kb.controller('RegisterCtrl', ['$scope', '$http', function($scope, $http){

    $scope.user = {
        u_email: '',
        u_name: '',
        u_pwd: '',
        u_confirm_pwd: ''
    };

    $scope.submit = function() {
        var req = {
            method: 'POST',
            url: ipAddress + '/users/email/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.user)
        };

        $http(req).success(function(result){
           if(result.errno){
               $('.validation_msg').html('注册失败, 请联系管理员');
           } else {
               $('.validation_msg').html('注册成功, 去登陆');
           }
        });
    }

}]);



