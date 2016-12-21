'use strict';

/* APP Module */

var kanbao = angular.module('kanbao', [
    'ngRoute',
    'ngCookies',
    'HomeController',
    'ProfileController',
    'AccountController',
    'HeaderController',
    'chatApp',
    'angularCSS',
    'btford.socket-io'
]).value("THROTTLE_MILLISECONDS", 3000);

kanbao.config(function($routeProvider, $cssProvider){
   
    angular.extend($cssProvider.defaults, {
        persist: false,
        preload: false,
        bustCache: false,
        breakpoints: {
            mobile: '(max-width: 640px)',
            desktop: '(min-width: 650px)'
        }
    });
    
    
    $routeProvider.
    when('/', {
        templateUrl: 'views/homepage.html',
        // we can enable features like bust cache, persist and preload.
        // css: {
        //     href: '../stylesheets/home/h_default.css',
        //     bustCache: true
        // }
        controller: 'HomeCtrl',
        css: [
            {
                href: '../stylesheets/home/h_m_default.css',
                breakpoint: 'mobile'
            }, {
                href: '../stylesheets/home/h_default.css',
                breakpoint: 'desktop'
            }
        ]

    }).
    when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileCtrl',
        css: [
            {
                href: '../stylesheets/profile/p_default.css',
                breakpoint: 'mobile'
            }, {
                href: '../stylesheets/profile/p_default.css',
                breakpoint: 'desktop'
            }
        ]
    }).
    when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'LoginCtrl',
        css: [
            {
                href: '../stylesheets/account/a_default.css',
                breakpoint: 'mobile'
            }, {
                href: '../stylesheets/account/a_default.css',
                breakpoint: 'desktop'
            }
        ]
    }).
    when('/register', {
        templateUrl: 'views/account/register.html',
        controller: 'RegisterCtrl',
        css: [
            {
                href: '../stylesheets/account/a_default.css',
                breakpoint: 'mobile'
            }, {
                href: '../stylesheets/account/a_default.css',
                breakpoint: 'desktop'
            }
        ]
    });
    
    
});