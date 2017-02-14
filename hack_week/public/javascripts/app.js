'use strict';

/* APP Module */

var idea = angular.module('idea', ['ngRoute', 'loginController', 'angularCSS']).value("THROTTLE_MILLISECONDS", 3000);

idea.config(function($routeProvider, $cssProvider){
   
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
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        css: [
            {
                href: '../stylesheets/login/l_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/login/l_m_default.css',
                breakpoint: 'mobile'
            }    
        ]
    }).when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl',
        css: [
            {
                href: '../stylesheets/home/h_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/home/h_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    });
    
    
    
    
    
    
});


    