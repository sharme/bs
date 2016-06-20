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
        templateUrl: 'views/homepage.html',
        controller: 'FootstepsListCtrl'
      }).
        when('/foot/:footId',{
        templateUrl: 'views/footDetail.html',
        controller: 'FootDetailCtrl'
    }).
        when('/signUpCompleted', {
        templateUrl: 'views/register/complete.html'
    }).
        when('/register', {
        templateUrl: 'views/register/register.html'
    }).
        when('/profile',{
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    }).
        when('/logout', {
        controller: 'logoutController',
        templateUrl: 'views/homepage.html'
    }).
      otherwise({
        redirectTo: '/foot'
      });
  }]);
