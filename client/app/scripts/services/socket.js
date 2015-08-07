'use strict';

/**
 * @ngdoc service
 * @name lightApp.socket
 * @description
 * # socket
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('socket', function (socketFactory) {
    return socketFactory();
  });
