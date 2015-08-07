'use strict';

/**
 * @ngdoc filter
 * @name lightApp.filter:slug
 * @function
 * @description
 * # slug
 * Filter in the lightApp.
 */
angular.module('lightApp')
  .filter('slug', function () {
    return function (text) {
      return text.replace(/[^a-z0-9_ -]/gi, '').replace(/\s+/g, '-').toLowerCase();
    };
  });
