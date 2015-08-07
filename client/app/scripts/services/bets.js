'use strict';

/**
 * @ngdoc factory
 * @name lightApp.BetService
 * @description
 * # BetService
 * Service in the lightApp.
 */
angular.module('lightApp.BetService', [])
  .factory('BetService', function($resource, socket, $rootScope) {

  	var factory     = [];
  	var bets        = [];
    var bet         = {};
    var picked      = false;


    socket.on('betStatus', function (status) {

      //Bets closed
      factory.getBets(true, function(data){
        data.$promise.then(function() {
          factory.currentGame().status = status;
        });
      });

    });

    socket.on('newBet', function (bet) {
      factory.pushBet(bet);
    });

    socket.on('coinUpdate', function (coins) {
      console.log(coins);
      $rootScope.currentUser.public.coins = coins;
    });

    factory.queryDB = function() {
      return $resource('api/bets').query({}, function(data){
        bet = data;
      });
    };

    factory.getSingle = function(id) {
      return $resource('api/bet/:id', { id: id }).get({}, function(data){
        bet = data;
        return bet;
      });
    };

    factory.setBetStatus = function(status, data) {
      return $resource('api/bet/status/:status', { status: status }).save(data);
    };


  	factory.getBets = function(refresh, callback) {
      var cb = callback || angular.noop;
      if (!picked || refresh) {
        bets = factory.queryDB();
        picked = true;
        return cb(bets);
      }
      return cb(bets);
  	};

    factory.currentGame = function() {
      if (bets[0] !== undefined) {
        var g = bets[0].games.length-1;
        var game = bets[0].games[g];
        return game;
      }
    };

    factory.pushBet = function(bet) {
      factory.currentGame().bets.push(bet);
    };

    factory.placeBet = function(bet) {
      return $resource('api/bet').save(bet);
    };

    factory.findMyBet = function() {
      var id = $rootScope.currentUser._id;
      var game = factory.currentGame();
      if (game !== undefined) {
        var bets = game.bets;
        for (var i = bets.length - 1; i >= 0; i--) {
          if (bets[i].userid === id) {
            return bets[i];
          }
        }
        return false;
      }
    };

    factory.getBetInfo = function() {
      var id = $rootScope.currentUser._id;
      var game = factory.currentGame();
      if (game !== undefined) {
        var bets = game.bets;
        for (var i = bets.length - 1; i >= 0; i--) {
          if (bets[i].userid === id) {

            if (parseInt(bets[i].choice) === 0) {
              return {
                yourbet: bets[i].amount,
                yourteam: bets[i].choice,
                percentage: bets[i].amount / factory.currentGame().team[0].coins,
                of: factory.currentGame().team[1].coins,
              };
            }else{
              return {
                yourbet: bets[i].amount,
                yourteam: bets[i].choice,
                percentage: bets[i].amount / factory.currentGame().team[1].coins,
                of: factory.currentGame().team[0].coins,
              };
            }

          }
        }
        return 'sup';
      }
    };

    factory.getTimer = function() {
      var game = factory.currentGame();
      if (game !== undefined) {
        return (parseInt(game.gameid) + (game.timer*1000));
      }
    };

    
    return factory;
  });