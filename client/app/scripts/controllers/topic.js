'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:TopicCtrl
 * @description
 * # TopicCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('TopicCtrl', function ($scope, TopicService, socket, $rootScope, $stateParams) {

    $scope.topic = TopicService.getSingle($stateParams.slug);
    $scope.addComment = function(comment) {
      var form = {
        id: $scope.topic._id,
        comment: comment,
        user: $rootScope.currentUser._id
      };
      TopicService.createComment(form);
      // socket.emit('new globalchat', comment);
      $scope.comment = '';
    };

  });
