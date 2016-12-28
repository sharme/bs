'use strict';

var kb = angular.module('HomeController', []);


kb.controller('HomeCtrl', ['$scope', '$http', '$window','$cookies', function($scope, $http, $window, $cookies) {

    $http({method: 'GET', url: ipAddress + '/stones/getStones'}).
    success(function(data){
        $scope.stones = data;
    }, function(error){
        $scope.error = error;
    });
    
    $scope.selection = function(val) {
        $scope.headerVal = val;
    };

    $scope.messenger = function(u_id, u_name) {

        if($('.view-container').width() < '640'){
            $('.messenger').css('margin-left','40%');
            $('.messenger').css('width','60%');
        }
        
        if($cookies.get('u_name')) {

            $('.messenger').css('display', 'block');
            $scope.toMessenger = u_name;
            $('.messenger-title-to').html($scope.toMessenger);
            console.log($scope.toMessenger);
        } else {
            $window.location.href = '#/register';
        }
    };

    $scope.closeMessenger = function() {
        $('.messenger').css('display','none');
    };
    

    $http({method: 'GET', url: ipAddress + '/users/email/getUsers'}).
    success(function(data){
        $scope.users = data;
    }, function(error){
        $scope.error = error;
    });
    
    
    $scope.stoneDetail = function(s_id) {
        $window.location.href = '#/stone/' + s_id;
    };
    
    
    
    $scope.checkUser = function(u_id) {
      if($cookies.get('u_id') == u_id){
          return true;
      } else {
          return false;
      }  
    };
    
    
}]);


kb.controller('StoneDetailCtrl', ['$scope', '$http', '$window','$cookies','$routeParams', function($scope, $http, $window, $cookies, $routeParams) {

    console.log("cool, stone details.");

    $scope.backHome = function(){
        $window.history.back();
    };

    $http({method: 'GET', url: ipAddress + '/stones/getStonesBySID', params:{s_id: $routeParams.stoneId}}).
    success(function(data){
        $scope.stone = data[0];
    }, function(error){
        $scope.error = error;
    });

    $scope.replyMsg = function(to) {

        if($cookies.get('u_name')) {
            $('.messenger').css('display','block');
            $scope.toMessenger = to;
            $('.messenger-title-to').html($scope.toMessenger);
            console.log(to);
        } else {
            $window.location.href = '#/register';
        }

    };

    $scope.checkUser = function(u_id) {
        if($cookies.get('u_id') == u_id){
            return true;
        } else {
            return false;
        }
    };

}]);