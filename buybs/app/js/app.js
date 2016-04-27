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
        when('/signUpCompleted', {
        templateUrl: 'partials/register/step3.html'
    }).
        when('/collectShopInfo', {
        templateUrl: 'partials/register/step2.html'
    }).
        when('/register', {
        templateUrl: 'partials/register/step1.html'
    }).
      when('/shops/:shopId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'ShopDetailCtrl'
      }).
      otherwise({
        redirectTo: '/shops'
      });
  }]);
