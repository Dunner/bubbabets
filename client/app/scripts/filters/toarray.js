'use strict';

/**
 * @ngdoc filter
 * @name lightApp.filter:toArray
 * @function
 * @description
 * # toArray
 * Filter in the lightApp.
 */
angular.module('lightApp')
  .filter('toArray', function () {
    return function (obj, addKey) {
      if ( addKey === false ) {
        return Object.keys(obj).map(function(key) {
          return obj[key];
        });
      } else {
        return Object.keys(obj).map(function (key) {
          if(typeof obj[key] === 'object') {
            return Object.defineProperty(obj[key], '$key', {enumerable: false, value: key});
          }
        });
      }
    };
  });
