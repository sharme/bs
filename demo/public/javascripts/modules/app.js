var buybs = angular.module('buybs', []);



/* define an asynchronous controller function "shopListCtrl" */
buybs.controller('shopListCtrl', function ($scope, $http) {
    // $http.get('/services/shopService/shops').success(function(data){
    //     console.log("server address: public/javascripts/modules/app.js/shopListCtrl");
    //     $scope.shops = data;
    // });

    $http({method: 'GET', url: '/api/shopService/GetShops'})
        .success(function(data){

            console.log("server address: public/javascripts/modules/app.js/shopListCtrl");
            // $log.info(data);
            $scope.shops = data;
    }, function(error){
            $scope.error = error;
            // $log.info(error);
    });


});




buybs.controller('shopDetailCtrl',['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    console.log('shop detail controller is here');
    $http.get('/services/shopService/shops/' + $routeParams.shop_name).success(function(data){
        $scope.shop = data;
    });
}]);



