'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:bettingAmount
 * @description
 * # bettingAmount
 */
angular.module('lightApp')
.directive('bettingAmount', function($rootScope){
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {

      modelCtrl.$parsers.push(function (inputValue) {
        var maxinput = $rootScope.currentUser.public.coins;
        var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

        if (transformedInput !== inputValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }

        if (transformedInput > maxinput) {
          transformedInput = JSON.stringify(maxinput);
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }

        return transformedInput;
      });
    }
  };
});