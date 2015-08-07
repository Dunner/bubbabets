'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:TopicsCtrl
 * @description
 * # TopicsCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('TopicsCtrl', function ($scope, TopicService, socket, $rootScope, $filter) {

    $scope.messages = TopicService.getMessages();
    $scope.categories = ['news', 'general', 'help'];

    $scope.addTopic = function(form) {
      var topic = {
        title: form.title,
        titleslug: $filter('slug')(form.title),
        category: form.category,
        content: form.content,
        byid: $rootScope.currentUser._id
      };
      TopicService.createTopic(topic);
      // socket.emit('new globalchat', topic);
      $scope.topic = '';
    };



  });
