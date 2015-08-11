// lib/controllers/team.js

var mongoose = require('mongoose'),
    async = require('async'),
    Team = mongoose.model('Team');


// List of teams
exports.query = function(req, res) {
  //Return teams
  Team.find().sort('-name').limit(10).exec(function(err, teams) {
    if (err) {console.log(err); return res.json(500, err);}
    
    //No teams
    if (teams.length < 1) {

    }
    
    res.json(teams);
      
  });
};

// Create a team
exports.create = function(req, res) {
  var team = new Team(req.body);
  team.wins = 0;
  team.losses = 0;

  team.save(function(err) {
    if (err) return res.json(500, err);
    res.json(team);
  });
};
// Show a team
exports.show = function(req, res) {

};




// Update a team

exports.update = function(req, res) {

};



// Remove a team

exports.remove = function(req, res) {
  var id = req.params.id;
  Team.findById(id, function (err, team){
    if(team) {
      team.remove();
      res.json({id: id});
    }
  });
};


