'use strict';

/**
 * @ngdoc service
 * @name lightApp.user
 * @description
 * # user
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/single/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      }
    });
  });