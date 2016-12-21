'use strict';

var kb = angular.module('HeaderController',[]);



kb.controller('HeaderCtrl', ['$scope', '$http', '$window','$cookies', function($scope, $http, $window, $cookies) {
    
    
    $scope.initIcon = function(){
        var cookieUser = $cookies.get('u_name');
        if(cookieUser) {
            if ($cookies.get('u_avatar')) {
                $scope.iconUrl = $cookies.get('u_avatar');
                $('.header-account-login').css("display",'none');
                $scope.url = '#/profile';
            } else {
                console.log('cookies: ' + cookieUser);
                $('.header-account-login').css("display",'none');
                $scope.cookieUser = cookieUser;
                $scope.iconUrl = '../../images/icon/default_avatar.png';
                $scope.url = '#/profile';
            }
        } else {
            $('.user-avatar').css("display", 'none');
        }
    };

    
}]);