'use strict';

/**
 * @ngdoc factory
 * @name lightApp.TeamService
 * @description
 * # TeamService
 * Service in the lightApp.
 */
angular.module('lightApp.TeamService', [])
  .factory('TeamService', function($resource) {

  	var factory     = [];
    var teams       = [];

    factory.queryDB = function(refresh, callback) {
      var cb = callback || angular.noop;
      $resource('api/teams').query({}, function(data){
        teams = data;
        return cb(teams);
      });
    };

    factory.getTeam = function(id) {
      return $resource('api/teams/:id', { id: id }).get();
    };

  	factory.getTeams = function() {
      return teams;
  	};


    factory.createTeam = function(team) {
      return $resource('api/teams/create').save(team, function(data){
        teams.push(data);
      });
    };

    factory.deleteTeam = function(id) {
      return $resource('api/teams/:id', { id: id }).delete({}, function(data){
        if(data) {
          for (var i = teams.length - 1; i >= 0; i--) {
            if (teams[i]._id === data.id) {
              var index = teams.indexOf(teams[i]);
              teams.splice(index, 1);
            }
          }
        }
      });
    };
    
    return factory;
  });