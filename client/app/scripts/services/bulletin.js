'use strict';

/**
 * @ngdoc factory
 * @name lightApp.BulletinService
 * @description
 * # BulletinService
 * Service in the lightApp.
 */
angular.module('lightApp.BulletinService', [])
  .factory('BulletinService', ['$resource', function($resource) {

	  var factory         = [];
	  var messages        = [];
    var picked          = false;

    factory.queryDB = function() {
      return $resource('api/bulletin/:messageId', { messageId: '@messageId' }).query({}, function(data){
        messages = data;
      });
    };

  	factory.getMessages = function() {
      if (!picked) {
        messages = factory.queryDB();
        picked = true;
        return messages;
      }
      return messages;
  	};

    factory.pushMessage = function(message) {
      messages.push(message);
    };

    factory.createMessage = function(message) {
      return $resource('api/bulletin').save(message);
    };
    
    return factory;
  }]);