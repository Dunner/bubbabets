'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('UsersCtrl', function ($scope, $resource) {

    var routes = {
      users: $resource('/api/users/all'),
    };

    routes.users.query( function(data) {
      $scope.users = data;
    });

  });
