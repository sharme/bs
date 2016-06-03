'use strict';

/* App Module */

var buybs = angular.module('buybs', [
  'ngRoute',
  'buybsControllers',
  'buybsFilters',
    'ngCookies'
]);

buybs.config(['$routeProvider',
  function($routeProvider) {
    
    $routeProvider.
      when('/shops', {
        templateUrl: 'partials/homepage.html',
        controller: 'FootstepsListCtrl'
      }).
        when('/shops/:shopId',{
        templateUrl: 'partials/shopDetail.html',
        controller: 'ShopDetailCtrl'
    }).
        when('/signUpCompleted', {
        templateUrl: 'partials/register/step3.html'
    }).
        when('/collectShopInfo', {
        templateUrl: 'partials/register/step2.html',
        controller: 'ShopController'
    }).
        when('/register', {
        templateUrl: 'partials/register/step1.html'
    }).
        when('/profile',{
        templateUrl: 'partials/profile.html'
    }).
        when('/logout', {
        controller: 'logoutController',
        templateUrl: 'partials/homepage.html'
    }).
      otherwise({
        redirectTo: '/shops'
      });
  }]);
