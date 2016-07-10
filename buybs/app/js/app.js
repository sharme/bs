'use strict';

/* App Module */

var buybs = angular.module('buybs', [
  'ngRoute',
  'buybsControllers',
  'buybsFilters',
    'ngCookies',
    'ngSanitize'
]);

buybs.config(['$routeProvider',
  function($routeProvider) {
    
    $routeProvider.
    when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
    }).
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
        templateUrl: 'views/register/register.html',
        controller: 'RegisterCtrl'
    }).
        when('/profile',{
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    }).
        when('/message',{
        templateUrl: 'views/message.html',
        controller: 'MessageController'
    }).
        when('/logout', {
        controller: 'logoutController',
        templateUrl: 'views/homepage.html'
    }).
        when('/community/index', {
        controller: 'CommunityCtrl',
        templateUrl: 'views/community/index.html'
    }).
        when('/topics/add',{
        templateUrl: 'views/community/addTopic.html',
        controller: 'AddTopicCtrl'
    }).
        when('/topics/:tp_id',{
        templateUrl: 'views/community/topic.html',
        controller: 'TopicCtrl'
    });
  }]);
