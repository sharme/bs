'use strict';

var chatApp = angular.module('chatApp', []);

var generator = function(){
  return Math.floor((Math.random() * 10) + 1);
};

var count = 1;

chatApp.controller('SocketCtrl', function ($log, $scope, $cookies, chatSocket, messageFormatter) {
        $scope.nickName = 'guest';
        if($cookies.get('u_name')){
            $scope.nickName = $cookies.get('u_name');
        }
        $scope.messageLog = 'Ready to chat!\n';
        $scope.sendMessage = function() {

            var toMessenger = $('.messenger-title-to').html();
            if(!toMessenger) toMessenger = 'unknown';

            $log.debug('sending message', $scope.message + ", to: " + toMessenger);
            chatSocket.emit('message', $scope.nickName, toMessenger, $scope.message);
            $scope.message = '';
        };

        $scope.$on('socket:broadcast', function(event, data) {
            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
            });
        });

        $scope.closeMessenger = function() {
            $('.messenger').css('display','none');
        };
    
    
    });
