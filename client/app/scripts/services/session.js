'use strict';

/**
 * @ngdoc service
 * @name lightApp.session
 * @description
 * # session
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });

