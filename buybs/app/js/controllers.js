'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);



// buybsControllers.controller('ShopListCtrl', ['$scope', 'Shop',
//   function($scope, Shop) {
//     console.log('coming!');
//     $scope.shops = Shop.query();
//   }]);

// buybsControllers.controller('ShopDetailCtrl', ['$scope', '$routeParams', 'Shop',
//   function($scope, $routeParams, Shop) {
//     $scope.shop = Shop.get({shopId: $routeParams.shopId};)
//   }]);



/* define an asynchronous controller function "shopListCtrl" */
buybsControllers.controller('ShopListCtrl', ['$scope', '$http', function ($scope, $http) {

  $http({method: 'GET', url: 'http://127.0.0.1:8081/api/shopService/GetShops'})
      .success(function(data){
        console.log("server address: public/javascripts/modules/app.js/shopListCtrl");
        $scope.shops = data;
      }, function(error){
        $scope.error = error;
      });
}]);


/* Call web service to add a user account info into MONGODB */
buybsControllers.controller('SignUpController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  $scope.data = {
    username: '',
    phoneNumber: '',
    password: '',
    scCode: '',
    agreement: "checked"
  };

  $scope.submit = function(){
    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:8081/api/userService/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };
    console.log("sign up: " + JSON.stringify($scope.user));

    $http(req).success(function(result){
      console.log('sign up:' + result);
      $scope.result = result;
      $window.location.href = '#/collectShopInfo';
    }, function(error){
      console.log(error);
    });
    $scope.user = angular.copy($scope.data);
  };


  $scope.user = angular.copy($scope.data);

}]);


/* Call Web service to add a shop info into MONGODB */

buybsControllers.controller('ShopController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  $scope.data = {
    shop_name: '',
    shop_type: '',
    shop_address: '',
    sells: '',
    images:{
      image1: {
        url: '',
        price: '',
        desc: ''
      }
    }
  };

  $scope.submit = function(){
    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:8081/api/shopService/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.shop)
    };
    console.log("sign up: " + JSON.stringify($scope.shop));

    $http(req).success(function(result){
      console.log('sign up:' + result);
      $scope.result = result;
      $window.location.href = '#/signUpCompleted';
    }, function(error){
      console.log(error);
    });
    $scope.shop = angular.copy($scope.data);
  };


  $scope.shop = angular.copy($scope.data);

}]);















