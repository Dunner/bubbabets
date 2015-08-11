// models/bet.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Bet Schema

var BetSchema = new Schema({
	identifier : String,
	games : [
		{
		  gameid : String,
		  status : Number,
		  winner : Number,
		  timer  : Number,
		  team   : [Schema.Types.Mixed],
		  bets : [
		    {
		      userid: String,
		      username: String,
		      userpaperdoll: String,
		      choice: String,
		      amount: String,
		      odds: String,
		    }
		  ]
		}
	]
});

mongoose.model('Bet', BetSchema);