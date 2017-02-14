'use strict';


/* APP Module */

var xw = angular.module('xw', ['ngRoute', 'angularCSS']).value('THROTTLE_MILLISECONDS');

xw.config(function($routeProvider, $cssProvider){
   
    angular.extend($cssProvider.defaults, {
        persist: false,
        preload: false,
        bustCache: false,
        breakpoints: {
            mobile: '(max-width: 640)',
            desktop: '(min-width: 650px)'
        }
    });
    
    $routeProvider.when('/', {
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
        
    }).when('/sapphire', {
        templateUrl: 'views/sapphire.html',
        controller: 'sapphireCtrl',
        css: [
            {
                href: '../stylesheets/home/h_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/home/h_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    }).when('/ruby', {
        templateUrl: 'views/ruby.html',
        controller: 'rubyCtrl',
        css: [
            {
                href: '../stylesheets/home/h_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/home/h_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    }).when('/products', {
        templateUrl: 'views/products.html',
        controller: 'productCtrl',
        css: [
            {
                href: '../stylesheets/product/p_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/product/p_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    }).when('/product/:productId', {
        templateUrl: 'views/product_details.html',
        controller: 'productDetailCtrl',
        css: [
            {
                href: '../stylesheets/product/p_detail_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/product/p_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    }).when('/activities', {
        templateUrl: 'views/activities.html',
        controller: 'activityCtrl',
        css: [
            {
                href: '../stylesheets/activity/a_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/activity/a_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    }).when('/manage', {
        templateUrl: 'views/manage/home.html',
        controller: 'manageCtrl',
        css: [
            {
                href: '../stylesheets/manage/m_default.css',
                breakpoint: 'desktop'
            }, {
                href: '../stylesheets/manage/m_m_default.css',
                breakpoint: 'mobile'
            }
        ]
    });
    
    
    
    
});

