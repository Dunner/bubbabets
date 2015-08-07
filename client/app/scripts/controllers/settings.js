'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, $resource) {

    $scope.cUser = $rootScope.currentUser;

    var routes = {
      changeName: $resource('/api/users/changeName'),
      changePaperdoll: $resource('/api/users/changePaperdoll'),
      changePassword: $resource('/api/users/changePassword'),
    };

    $scope.changeUsername = function() {
      var name = $scope.cUser.public.name;
      var obj = {
        name: name
      };
      routes.changeName.save({}, obj ,function(data) {
        $rootScope.currentUser.public = data;
        $scope.cUser.public = $rootScope.currentUser.public;
      });
    };

    $scope.changePaperdoll = function() {
      routes.changePaperdoll.save({}, $scope.paperdoll ,function(data) {
        console.log(data);
        $rootScope.currentUser.public.paperdoll = $scope.paperdoll;
        location.reload();
      });
    };

  });
