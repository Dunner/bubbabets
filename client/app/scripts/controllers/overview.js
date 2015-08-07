'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('OverviewCtrl', function ($scope, $rootScope) {

    $scope.cUser = $rootScope.currentUser;
  });
