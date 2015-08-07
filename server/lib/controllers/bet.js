// lib/controllers/bet.js

var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    Bet = mongoose.model('Bet'),
    socketIO = global.socketIO;

// List of bets
exports.query = function(req, res) {
  //Return conversation
  Bet.find().sort('-createdAt').limit(10).exec(function(err, bets) {
    if (err) {console.log(err); return res.json(500, err);}
    res.json(bets);
      
  });
};

// Show a bet
exports.show = function(req, res) {

};

// Place a bet
exports.create = function(req, res) {
  Bet.findOne({'identifier': 1}, function (err, bet) {
    var g = bet.games.length-1;

    User.findOne({
      '_id': req.body.userid
    }, function (err, user) {
      if (err) return res.json(500, err);
      if (user) {

        var newbet = {
          userid: req.body.userid,
          username: user.public.name,
          choice: req.body.choice,
          amount: req.body.amount
        };
        bet.games[g].bets.push(newbet);
        //increment bet on team

        bet.games[g].team[newbet.choice].coins += parseInt(newbet.amount);

        bet.save(function(err) {
          if (err) return res.json(500, err);
          socketIO.sockets.emit('newBet', newbet);
          res.json(bet);
        });

      }
    });

  });
};


// Update a bet

exports.update = function(req, res) {

};


// Start/stop betting

exports.setstatus = function(req, res) {
  var status = req.params.status;
  var teamA = req.body.teamA;
  var teamB = req.body.teamB;
  var timer = req.body.timer;
  var winner = req.body.winner;

  if (status == 1) {
    //create new game
    Bet.findOne({'identifier': 1}, function (err, bet) {

      if (bet === null) {
        var bet = new Bet({
          'identifier': 1,
        });
      }

      var game = bet.games.push({
        gameid: Date.now(),
        status: 1,
        timer: timer,
        team: [
        {
          name: teamA,
          coins: 0,
        },{
          name: teamB,
          coins: 0,
        }]
      })

      bet.save(function(err) {
        if (err) return res.json(500, err);
        socketIO.sockets.emit('betStatus', 1);
      });

      //STOP BETTING AFTER $timer MILISECONDS
      setTimeout(function(){
        var g = bet.games.length-1;
        var game = bet.games[g];
        bet.games[g].status = 2;
        bet.save(function(err) {
          if (err) return res.json(500, err);
          socketIO.sockets.emit('betStatus', 2);
          res.json(bet);
        });
      }, timer*1000);
      
    });

  } else if(status == 3){

    //Stopped betting
    Bet.findOne({'identifier': 1}, function (err, bet) {
      var g = bet.games.length-1;
      var game = bet.games[g];
      bet.games[g].status = 3;
      bet.games[g].winner = Math.round(Math.random()); //winner;


      bet.save(function(err) {
        if (err) return res.json(500, err);
      });
      //edit money for winners/loosers
      async.each(bet.games[g].bets, 
        function(elem, callback) {


          User.findOne({
            '_id': elem.user
          }, function (err, user) {
            if (err) return res.json(500, err);
            if (user) {
              //winner or looser?
              if (elem.choice == bet.games[g].winner) {
                //winner
                //user.public.coins
                if (bet.games[g].winner == 1) {
                  var loosermoney = bet.games[g].team[0].coins;
                  var winnermoney = bet.games[g].team[1].coins;
                  user.public.coins += loosermoney * (elem.amount / winnermoney);
                }else{
                  var loosermoney = bet.games[g].team[1].coins;
                  var winnermoney = bet.games[g].team[0].coins;
                  user.public.coins += loosermoney * (elem.amount / winnermoney);
                }
                
                user.save(function(err) {
                  global.userlist[elem.userid].emit('coinUpdate', user.public.coins);
                });
              } else {
                //looser
                user.public.coins -= elem.amount;
                if (user.public.coins <= 0) {
                  user.public.coins = 100;
                };
                user.save(function(err) {
                  global.userlist[elem.userid].emit('coinUpdate', user.public.coins);
                });
              }
            };
            callback();
          });

        },
        function(err){
          if (err) return res.json(500, err);
          socketIO.sockets.emit('betStatus', 3);
          res.json(bet);
        }
      );
    });
  }
};

// Remove a bet

exports.remove = function(req, res) {

};


