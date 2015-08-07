'use strict';

/**
 * @ngdoc factory
 * @name lightApp.BuddyService
 * @description
 * # BuddyService
 * Service in the lightApp.
 */
angular.module('lightApp.BuddyService', [])
  .factory('BuddyService', function($resource, $rootScope) {

		var factory         = [];
		var buddies         = [];
		var picked          = false;

    factory.queryDB = function(id) {
      return $resource('api/users/buddies/:id', { id: id }).query({}, function(data){
        buddies = data;
      });
    };

  	factory.getBuddies = function(id) {
  		if (!picked) {
  			buddies = factory.queryDB(id);
  			picked = true;
  			return buddies;
  		}
  	  return buddies;
  	};
    factory.removeBuddy = function(id) {
      for (var i = buddies.length - 1; i >= 0; i--) {
        if (buddies[i]._id === id) {
          buddies.splice(i,1);
          return $resource('api/users/buddies/remove/:user/:buddy', { user: $rootScope.currentUser._id, buddy: id }).delete();
        }
      }
    };

    factory.pushMessage = function(buddy) {
      buddies.push(buddy);
    };

    factory.addBuddy = function(user) {
      return $resource('api/users/buddies/add/:id', { id: user.id }).save({}, function(){
        buddies.push({_id: user.id, name: user.name, paperdoll: user.paperdoll});
      });
    };

    factory.isBuddy = function(id) {
      var realids = [];
      for (var i = $rootScope.currentUser.public.friends.length - 1; i >= 0; i--) {
        realids.push($rootScope.currentUser.public.friends[i].id);
      }
      for (var x = realids.length - 1; x >= 0; x--) {
        if (realids[x] === id) {
          return true;
        }
      }
      return false;
    };
    
    return factory;
  });