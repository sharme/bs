'use strict';

/* Services */

var buybsServices = angular.module('buybsServices', ['ngResource']);

buybsServices.factory('Shop', ['$resource',
  function($resource){
    return $resource('http://127.0.0.1:8081/api/shopService/GetShops', {}, {
      query: {method:'GET', params: {}, }
    });
  }]);


//
// $http({method: 'GET', url: '/api/shopService/GetShops'})
//     .success(function(data){
//       console.log("server address: public/javascripts/modules/app.js/shopListCtrl");
//       $scope.shops = data;
//     }, function(error){
//       $scope.error = error;
//     });