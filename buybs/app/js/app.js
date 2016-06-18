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
      when('/foot', {
        templateUrl: 'partials/homepage.html',
        controller: 'FootstepsListCtrl'
      }).
        when('/foot/:footId',{
        templateUrl: 'partials/footDetail.html',
        controller: 'FootDetailCtrl'
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
        templateUrl: 'partials/profile.html',
        controller: 'ProfileController'
    }).
        when('/logout', {
        controller: 'logoutController',
        templateUrl: 'partials/homepage.html'
    }).
      otherwise({
        redirectTo: '/foot'
      });
  }]);
