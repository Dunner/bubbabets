// models/team.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Bulletin Schema

var TeamSchema = new Schema({
  name: String,
  description: String,
  image: String,
  wins: Number,
  losses: Number
});

// keep track of when the messasges are updated and created
TeamSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('Team', TeamSchema);