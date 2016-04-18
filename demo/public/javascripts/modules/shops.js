var shops = angular.module('shops', []);


shops.controller('shopListCtrl', function ($scope, $http) {

    $http.get('/services/shopService/shops').success(function(data){
        $scope.shops = data;
    });

});



