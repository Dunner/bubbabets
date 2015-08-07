'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('UserCtrl', function ($scope, $resource, $stateParams, BuddyService, MessageService, user) {
    // console.log(user);
    $scope.MessageService = MessageService;

    $scope.userId = $stateParams.id;
    
    $scope.user = user;

    $scope.addFriend = function () {
      BuddyService.addBuddy({id: $scope.userId, name: $scope.user.name, paperdoll: $scope.user.paperdoll});
    };

    $scope.isBuddy = function(id){
      return BuddyService.isBuddy(id);
    };
  });