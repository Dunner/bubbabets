// models/bulletin.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Bulletin Schema

var BulletinSchema = new Schema({
  title: String,
  byid: String,
  byname: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

// keep track of when the messasges are updated and created
BulletinSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('Bulletin', BulletinSchema);