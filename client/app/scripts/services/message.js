'use strict';

/**
 * @ngdoc factory
 * @name lightApp.MessageService
 * @description
 * # MessageService
 * Service in the lightApp.
 */
angular.module('lightApp.MessageService', [])
  .factory('MessageService', function($resource, $timeout, $rootScope) {

  	var factory         = [];
  	var conversations   = [];
    var picked          = false;
    var chatopen        = false;
    var target          = {
      id: undefined,
      name: undefined,
      messages: undefined
    };

    var newTarget = function(id, name) {
      target.id = id;
      target.name = name;
      for (var i = conversations.length - 1; i >= 0; i--) {
        if (conversations[i].users[0] === id) {
          target.messages = conversations[i].messages;
          conversations[i].undread = 0;
        }
      }
    };

    factory.queryDB = function(id) {
      return $resource('api/conversation/all/:id', {id: id}).query({});
    };

  	factory.getConversations = function(id) {
      if (!picked) {
        conversations = factory.queryDB(id);
        picked = true;
        return conversations;
      }
      return conversations;
  	};

    factory.createMessage = function(message) {
      return $resource('api/conversation/save').save(message);
    };

    factory.joinMessage = function(message) {
      for (var i = conversations.length - 1; i >= 0; i--) {
        //Add unread
        if (conversations[i].users[0] === message.who) {
          conversations[i].messages.push(message);
          if (!conversations[i].undread) {
            conversations[i].undread = 1;
          } else {
            conversations[i].undread++;
          }
        }
      }
    };
    factory.createConversation = function(target, message) {
      console.log('ran');
      var users = [target.id, target.name];
      conversations.push({
        users: users,
        messages: [{
          message: message.message,
          who: $rootScope.currentUser._id
        }]
      });
    };
    factory.openChat = function(id, name) {
      chatopen = true;
      newTarget(id,name);
      $timeout(function(){
        var objDiv = document.getElementById('scroller');
        objDiv.scrollTop = objDiv.scrollHeight;
      },100);
    };
    factory.closeChat = function() {
      chatopen = false;
    };
    factory.chatOpen = function() {
      return chatopen;
    };
    factory.getTarget = function() {
      return target;
    };
    
    return factory;
  });