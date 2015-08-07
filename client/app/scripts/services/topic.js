'use strict';

/**
 * @ngdoc factory
 * @name lightApp.TopicService
 * @description
 * # TopicService
 * Service in the lightApp.
 */
angular.module('lightApp.TopicService', [])
  .factory('TopicService', ['$resource', function($resource) {

  	var factory         = [];
  	var messages        = [];
    var message         = {};
    var picked          = false;

    factory.queryDB = function() {
      return $resource('api/topics/').query({}, function(data){
        message = data;
      });
    };

    factory.getSingle = function(slug) {
      return $resource('api/topic/:slug', { slug: slug }).get({}, function(data){
        message = data;
        return message;
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

    factory.createTopic = function(message) {
      return $resource('api/topic').save(message);
    };

    factory.createComment = function(message) {
      return $resource('api/topic/comment').save(message);
    };
    
    return factory;
  }]);