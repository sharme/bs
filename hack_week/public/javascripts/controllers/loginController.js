'use strict';

var lg = angular.module('loginController', []);

lg.controller('loginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

    console.log("controller is here!!!");

    $scope.LDAP = 'Login with your LDAP account';

    $scope.submit = function(){

        console.log('form...')
        
        $window.location.href = '#/home';

    };


}]);