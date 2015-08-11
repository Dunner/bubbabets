'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('AdminCtrl', function ($scope, BetService, TeamService, $timeout) {
    
    $scope.betservice = BetService;
    $scope.teamservice = TeamService;
    $scope.admin = {
      betinfo: {
        team: [],
        timer: 10
      }
    };
    $scope.test = 'test';

    TeamService.queryDB(true, function(data){
      data.$promise.then(function() {
        $scope.teams = TeamService.getTeams();
      });
    });
    //ADMINSTUFF
    $scope.startBetting = function(){
      for (var i = $scope.teams.length - 1; i >= 0; i--) {
        if($scope.teams[i]._id === $scope.admin.betinfo.team[0]) {
          $scope.admin.betinfo.team[0] = $scope.teams[i];
        }
      }
      for (var x = $scope.teams.length - 1; x >= 0; x--) {
        if($scope.teams[x]._id === $scope.admin.betinfo.team[1]) {
          $scope.admin.betinfo.team[1] = $scope.teams[x];
        }
      }
      BetService.setBetStatus(1, $scope.admin.betinfo);
    };

    $scope.stopBetting = function(){
      BetService.setBetStatus(2);
    };

    $scope.selectWinner = function(){
      BetService.setBetStatus(3, {winner: $scope.winnerform.choice});
    };

    $scope.timer = 'loading timer...';
    $scope.tickInterval = 1000;

    var tick = function() {
      var clock = Date.now();
      $scope.betInfo = BetService.getBetInfo();
      $scope.timer = Math.round( (BetService.getTimer() - clock) / 1000 );
      if ($scope.timer < 0) {
        $scope.timer = 0;
      }
      $timeout(tick, $scope.tickInterval);
    };


    $scope.createTeam = function(form){
      if (form.$valid) {
        TeamService.createTeam($scope.teamform);
      }
    };
    $scope.deleteTeam = function(id){
      TeamService.deleteTeam(id);
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);
  });
