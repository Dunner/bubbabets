'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:BulletinCtrl
 * @description
 * # BulletinCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('BulletinCtrl', function ($scope, BulletinService, socket, $rootScope) {

    $scope.messages = BulletinService.getMessages();

    $scope.addMessage = function(message) {
      var newMessage = {
        title: message,
        byid: $rootScope.currentUser._id,
        byname: $rootScope.currentUser.public.name,
        completed: false
      };
      BulletinService.createMessage(newMessage);
      socket.emit('new globalchat', newMessage);
      $scope.newMessage = '';
    };



  });
