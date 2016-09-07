'use strict';

/* App Module */

var buybs = angular.module('jk_backend', [
  'ngRoute',
  'buybsControllers',
  'buybsFilters',
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
        when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
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
        when('/recovery_email', {
        templateUrl: 'views/account/recovery_email.html',
        controller: 'RecoveryEmailCtrl'
    }).
        when('/reset_pwd', {
        templateUrl: 'views/account/reset_pwd.html',
        controller: 'ResetPwdCtrl'
    }).
        when('/reset_result', {
        templateUrl: 'views/account/reset_result.html',
        controller: 'ResetResultCtrl'
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
    });
  }]);



angular
    .module('jk_backend')
    .directive('zoom', function(){
        function link(scope, element, attrs){
            var $ = angular.element;
            var original = $(element[0].querySelector('.original'));
            var originalImg = original.find('img');
            var zoomed = $(element[0].querySelector('.zoomed'));
            var zoomedImg = zoomed.find('img');

            var mark = $('<div class="zoomed"></div>')
                .addClass('mark')
                .css('position', 'absolute')
                .css('height', scope.markHeight +'px')
                .css('width', scope.markWidth +'px');
                // .css('top', '200px');

            $(element).append(mark);

            element
                .on('mouseenter', function(evt){
                    mark.removeClass('hide');

                    var offset = calculateOffset(evt);
                    moveMark(offset.X, offset.Y);
                })
                .on('mouseleave', function(evt){
                    mark.addClass('hide');
                })
                .on('mousemove', function(evt){
                    var offset = calculateOffset(evt);
                    moveMark(offset.X, offset.Y);
                });

            scope.$on('mark:moved', function(event, data){
                updateZoomed.apply(this, data);
            });
            var firstMove = 1;
            var firstX;
            var firstY = 80;
            function moveMark(offsetX, offsetY){

                if(firstMove === 1) {
                    firstX = (scope.windowSize - 800)/2;
                    firstMove++;
                }
                console.log("offsetX: " + offsetX + " < " + firstX + " && " + offsetY + " < " + firstY);
                if(offsetX < firstX || offsetY < firstY) {
                    mark.addClass('hide');
                } else {
                    mark.removeClass('hide');
                }


                  var  x = offsetX;
                  var  y = offsetY;
                mark
                    .css('left', x + 'px')
                    .css('top',  y + 'px');

                scope.$broadcast('mark:moved', [
                    x - (scope.windowSize - 800)/2 + 20, y - 180, originalImg[0].height, originalImg[0].width
                ]);
            }

            function updateZoomed(originalX, originalY, originalHeight, originalWidth){
                var zoomLvl = scope.zoomLvl;
                scope.$apply(function(){
                    // zoomed
                    //     .css('height', '200px')
                    //     .css('width', '100%')
                    //     .css('margin-top','30px');
                    zoomedImg
                        .attr('src', scope.src)
                        .css('height', zoomLvl*originalHeight+'px')
                        .css('width', zoomLvl*originalWidth+'px')
                        .css('left',-zoomLvl*originalX +'px')
                        .css('top',-zoomLvl*originalY +'px');
                });

            }

            var rect;
            function calculateOffset(mouseEvent){
                rect = rect || mouseEvent.target.getBoundingClientRect();
                var offsetX = mouseEvent.clientX - 50;
                var offsetY = mouseEvent.clientY - 90;
                console.log("X: " + offsetX + ", Y: " + offsetY);
                return {
                    X: offsetX,
                    Y: offsetY
                }
            }

            attrs.$observe('ngSrc', function(data) {
                scope.src = attrs.ngSrc;
            }, true);


            attrs.$observe('zoomLvl', function(data) {
                scope.zoomLvl =  data;
            }, true);
        }

        return {
            restrict: 'EA',
            scope: {
                windowSize: '@windowSize',
                markHeight: '@markHeight',
                markWidth: '@markWidth',
                src: '@src',
                zoomLvl: "@zoomLvl"
            },
            template: [
                '<div class="original">',
                '<img style="width: 100%; height: 100%; cursor: zoom-in;" ng-src="{{src}}"/>',
                '</div>',
                '<div class="zoomed">',
                '<img/>',
                '</div>'
            ].join(''),
            link: link
        };
    });