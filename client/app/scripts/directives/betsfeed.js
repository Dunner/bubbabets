'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:betsFeed
 * @description
 * # betsFeed
 */
angular.module('lightApp')
.directive('betsFeed', function(BetService) {

  function link($scope, $element) {
    $scope.test = undefined;
    $element.test = undefined;
    $scope.betservice = BetService;

    function loadBets() {
      BetService.getBets(true, function(data){
        data.$promise.then(function() {
        });
      });
    }
    loadBets();


  }

  return {
    restrict: 'A',
    link: link,
    templateUrl: './views/betsfeed.html'
  };

});