'use strict';


var pc = angular.module('xw');


pc.controller('productCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

    $http({method: 'GET', url: ipAddress + '/products/getProducts'})
        .success(function(data){
            $scope.products = data;
        }, function(error){
            $scope.error = error;
        });
    
}]);


pc.controller('productDetailCtrl', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams){

    $http({method: 'GET', url: ipAddress + '/products/getProductByID', params:{p_id: $routeParams.productId}})
        .success(function(data){
            $scope.product = data[0];
            console.log(JSON.stringify($scope.product));
        }, function(error){
            $scope.error = error;
        });

}]);