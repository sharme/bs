'use strict';

/* App Module */

var buybs = angular.module('buybs', [
  'ngRoute',
  'buybsControllers',
  'buybsFilters'
]);

buybs.config(['$routeProvider',
  function($routeProvider) {
    
    $routeProvider.
      when('/shops', {
        templateUrl: 'partials/homepage.html',
        controller: 'ShopListCtrl'
      }).
        when('/shops/:shopId',{
        templateUrl: 'partials/shopDetail.html',
        controller: 'ShopDetailCtrl'
    }).
        when('/signUpCompleted', {
        templateUrl: 'partials/register/step3.html'
    }).
        when('/collectShopInfo', {
        templateUrl: 'partials/register/step2.html'
    }).
        when('/register', {
        templateUrl: 'partials/register/step1.html'
    }).
      otherwise({
        redirectTo: '/shops'
      });
  }]);
