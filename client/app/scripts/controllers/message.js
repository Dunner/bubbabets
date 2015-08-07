'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:MessagesCtrl
 * @description
 * # MessagesCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('MessageCtrl', function ($scope, $rootScope, MessageService, $timeout, socket) {

    $scope.messages = MessageService.getConversations($rootScope.currentUser._id);

    $scope.addMessage = function(message) {
      var newMessage = {
        users: [$rootScope.currentUser._id, $scope.target.id],
        message: {
          message: message,
          who: $rootScope.currentUser._id
        }
      };
      //send message to server & db
      MessageService.createMessage(newMessage);
      //display message
      if (!$scope.target.messages) {
      	$scope.target.messages = [];
      	MessageService.createConversation($scope.target, newMessage.message);
      }
      $scope.target.messages.push(newMessage.message);
      //push socket
      socket.emit('new privatechat', {to: $scope.target.id, message: newMessage.message});
      //empty input field
      $scope.newMessage = '';
      //Scroll down
	    $timeout(function(){
	      var objDiv = document.getElementById('scroller');
	      objDiv.scrollTop = objDiv.scrollHeight;
	    },100);
    };
  });
