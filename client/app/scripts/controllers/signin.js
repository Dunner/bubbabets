'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('SigninCtrl', function ($scope, Auth, $state, $rootScope) {
    $scope.user = {};
    $scope.errors = {};
    $scope.session = false;

    $scope.cUser = $rootScope.currentUser;

    if ($scope.cUser !== null) {
      $scope.session = true;
    }


    $scope.signin = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login('password', {
          email: $scope.user.email,
          password: $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $state.go('social.settings');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.errors.other = err.message;
          }
      });
      }
    };
  });