'use strict';

/* App Module */

var buybs = angular.module('jk_backend', [
  'ngRoute',
  'buybsControllers',
    'ngCookies',
    'ngSanitize',
    'infinite-scroll',
    'angularCSS'
]).value("THROTTLE_MILLISECONDS", 3000);

// you might call this after your module initalization
// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

buybs.config(['$routeProvider',
  function($routeProvider) {
    
    $routeProvider.
    when('/', {
        templateUrl: 'views/welcome/welcome.html',
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
        when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'LoginController'
    }).
        when('/register', {
        templateUrl: 'views/register/register.html',
        controller: 'RegisterCtrl'
    }).
        when('/recovery_pwd', {
        templateUrl: 'views/account/recovery_pwd.html',
        controller: 'RecoveryPwdCtrl'
    }).
        when('/reset_pwd', {
        templateUrl: 'views/account/reset_pwd.html',
        controller: 'ResetPwdCtrl'
    }).
        when('/reset_result', {
        templateUrl: 'views/account/reset_result.html',
        controller: 'ResetResultCtrl'
    }).
        when('/email_registration', {
        templateUrl: 'views/account/email_registration.html',
        controller: 'EmailRegistrationCtrl'
    }).
        when('/email_login', {
        templateUrl: 'views/account/email_login.html',
        controller: 'EmailLoginCtrl'
    }).
        when('/email_recovery_pwd', {
        templateUrl: 'views/account/email_recovery_pwd.html',
        controller: 'EmailRecoveryPwdCtrl'
    }).
        when('/email_reset', {
        templateUrl: 'views/account/email_reset.html',
        controller: 'EmailResetCtrl'
    }).
        when('/profile',{
        templateUrl: 'views/profile/profile.html',
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
        templateUrl: 'views/message/message.html',
        controller: 'MessageController'
    }).
        when('/about',{
        templateUrl: 'views/about/about.html',
        controller: 'AboutController'
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
        when('/community/topics/editTopic',{
        templateUrl: 'views/community/editTopic.html',
        controller: 'editTopicCtrl'
    }).
        when('/community/topics/:tp_id',{
        templateUrl: 'views/community/topic.html',
        controller: 'TopicCtrl'
    }).
        when('/tuyou/index',{
        templateUrl: 'views/tuyou/index.html',
        controller: 'tuyouCtrl'
    }).
        when('/tuyou/match',{
          templateUrl: 'views/tuyou/match.html',
          controller: 'matchCtrl'
      });
  }]);


