'use strict';

/* App Module */

var buybs = angular.module('jk_backend', [
  'ngRoute',
  'buybsControllers',
  'buybsFilters',
    'ngCookies',
    'ngSanitize',
    'infinite-scroll'
]).value("THROTTLE_MILLISECONDS", 3000);

// you might call this after your module initalization
// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

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
        when('/profile/edit',{
        templateUrl: 'views/profile/edit.html',
        controller: 'ProfileEditController'
    }).
        when('/footsteps/add',{
        templateUrl: 'views/footstep/add.html',
        controller: 'FootstepAddController'
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
        when('/community/topics/addTopic',{
        templateUrl: 'views/community/addTopic.html',
        controller: 'AddTopicCtrl'
    }).
        when('/community/topics/:tp_id',{
        templateUrl: 'views/community/topic.html',
        controller: 'TopicCtrl'
    });
  }]);
