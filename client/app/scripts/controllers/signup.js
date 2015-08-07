'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('SignupCtrl', function ($scope, $state, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.register = function(form) {
      Auth.createUser({
          email: $scope.user.email,
          password: $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $state.go('signin');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
          }
        }
      );
    };
  });