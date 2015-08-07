'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:BuddiesCtrl
 * @description
 * # BuddiesCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('BuddiesCtrl', function ($scope, $rootScope, BuddyService) {

    $scope.buddies = BuddyService.getBuddies($rootScope.currentUser._id);

    $scope.removeBuddy = function(id){
    	BuddyService.removeBuddy(id);
    };

  });
