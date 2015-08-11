'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:betsFeed
 * @description
 * # betsFeed
 */
angular.module('lightApp')
.directive('betsFeed', function(BetService, $rootScope) {

  function link($scope, $element) {
    $scope.test = undefined;
    $element.test = undefined;
    $scope.betservice = BetService;
    $scope.activeFeed = '1';
    $scope.betform = {
      choice: -1,
      amount: 0
    };
    
    $scope.changeFeed = function (feed) {
      $scope.activeFeed = feed;
    };

    function loadBets() {
      BetService.getGames(true, function(data){
        data.$promise.then(function() {
          BetService.forceBets();
        });
      });
    }
    loadBets();

    $scope.placeBet = function(form){
      if (form.$valid) {
        if ($scope.betform.choice !== -1) {
          BetService.placeBet({
            userid: $rootScope.currentUser._id,
            choice: $scope.betform.choice,
            amount: $scope.betform.amount
          });
          BetService.findMyBet();
        }
      }
    };

  }

  return {
    restrict: 'A',
    link: link,
    templateUrl: './views/betsfeed.html'
  };

});