// lib/controllers/bet.js

var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    Bet = mongoose.model('Bet'),
    Team = mongoose.model('Team'),
    socketIO = global.socketIO;

// List of bets
exports.query = function(req, res) {
  //Return bets
  Bet.find().sort('-createdAt').limit(10).exec(function(err, bets) {
    if (err) {console.log(err); return res.json(500, err);}
    
    //No bets, create one
    if (bets.length < 1) {
      var bet = new Bet({
        'identifier': 1,
      });
      bet.games.push({
        gameid: Date.now(),
        status: 3,
      });
      bet.save(function(err) {
        if (err) return res.json(500, err);
        socketIO.sockets.emit('betStatus', 3);
      });
    }
    
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
          userpaperdoll: user.public.paperdoll,
          choice: req.body.choice,
          amount: req.body.amount
        };
        console.log(newbet);
        bet.games[g].bets.push(newbet);
        //increment bet on team

        bet.games[g].team[newbet.choice].coins += parseInt(newbet.amount);
        bet.markModified('games');
        bet.save(function(err) {
          if (err) return res.json(500, err);
          console.log(bet.games[g].team);
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
  var timer = req.body.timer;
  var winner = req.body.winner;


  if (status == 1) {


    if (bet === null) {
      var bet = new Bet({
        'identifier': 1,
      });
    }
    //create new game
    if (req.body.team !== 'undefined') {
      Bet.findOne({'identifier': 1}, function (err, bet) {

        var teamA = req.body.team[0];
        var teamB = req.body.team[1];
        teamA.coins = 0;
        teamB.coins = 0;
        //prepare gameinfo
        var game = {
          gameid: Date.now(),
          status: 1,
          timer: timer,
          team: []
        };

        game.team.push(teamA);
        game.team.push(teamB);
        bet.games.push(game);

        bet.save(function(err) {
          if (err) return res.json(500, err);
          socketIO.sockets.emit('betStatus', 1);
        });
      });
      //STOP BETTING AFTER $timer MILISECONDS
      setTimeout(function(){
        Bet.findOne({'identifier': 1}, function (err, bet) {
          var g = bet.games.length-1;
          var game = bet.games[g];
          if (bet.games[g].status !== 3) {
            bet.games[g].status = 2;
            bet.save(function(err) {
              if (err) return res.json(500, err);
              socketIO.sockets.emit('betStatus', 2);
              res.json(bet);
            });
          };
        });
      }, timer*1000);

    };

    

  } else if(status == 2) {

    //Stop betting without timer
    Bet.findOne({'identifier': 1}, function (err, bet) {
      var g = bet.games.length-1;
      var game = bet.games[g];
      bet.games[g].status = 2;
      bet.save(function(err) {
        if (err) return res.json(500, err);
        socketIO.sockets.emit('betStatus', 2);
        res.json(bet);
      });
    });

  } else if(status == 3) {
    Bet.findOne({'identifier': 1}, function (err, bet) {

      //Stopped betting
      var g = bet.games.length-1;
      var game = bet.games[g];
      bet.games[g].status = 3;
      bet.games[g].winner = winner; //Math.round(Math.random());


      bet.save(function(err) {
        if (err) return res.json(500, err);
      });


      // INCREMENT/DECEREMENT winning/loosing team record
      if (bet.games[g].winner == 1) {
        var winnerteam = bet.games[g].team[1]._id;
        console.log(winnerteam);
        Team.findById(winnerteam, function (err, team){
          if(team) {
            team.wins +=1;
            team.save();
          }
        });
        var looserteam = bet.games[g].team[0]._id;
        Team.findById(looserteam, function (err, team){
          if(team) {
            team.losses +=1;
            team.save();
          }
        });
      } else {
        var winnerteam = bet.games[g].team[0]._id;
        Team.findById(winnerteam, function (err, team){
          if(team) {
            team.wins +=1;
            team.save();
          }
        });
        var looserteam = bet.games[g].team[1]._id;
        Team.findById(looserteam, function (err, team){
          if(team) {
            team.losses +=1;
            team.save();
          }
        });
      }

      //edit money for winners/loosers
      async.each(bet.games[g].bets, 
        function(elem, callback) {


          User.findOne({
            '_id': elem.userid
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
                  console.log('this ran');
                  global.userlist[elem.userid].emit('coinUpdate', user.public.coins);
                });
              } else {
                //looser
                user.public.coins -= elem.amount;
                if (user.public.coins < 100) {
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
  };
};

// Remove a bet

exports.remove = function(req, res) {

};


