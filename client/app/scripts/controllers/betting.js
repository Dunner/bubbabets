'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:BettingCtrl
 * @description
 * # BettingCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('BettingCtrl', function ($scope, $rootScope, BetService, $timeout) {

    $scope.betservice = BetService;
  	$scope.admin = {
      betinfo: {
        teamA: 'Red',
        teamB: 'Blue',
        timer: 10
      }
    };

    $scope.placeBet = function(){
      if ($scope.bettingForm.$valid) {
      	BetService.placeBet({
      		userid: $rootScope.currentUser._id,
      		choice: $scope.betform.choice,
      		amount: $scope.betform.amount
      	});
        BetService.findMyBet();
      }
    };


    //ADMINSTUFF
    $scope.startBetting = function(){
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

    // Start the timer
    $timeout(tick, $scope.tickInterval);


  });
