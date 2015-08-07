// models/topic.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Topic Schema

var TopicSchema = new Schema({
  user    : {
    id  : String,
    name: String
  },
  title    : String,
  titleslug: String,
  category : String,
  content  : String,
  createdAt: Date,
  updatedAt: Date,
  comments : [
    {
      comment  : String,
      user     : {
        id: String,
        name: String
      },
      createdAt: Date,
    }
  ]
});

// keep track of when the topic is updated and created
TopicSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('Topic', TopicSchema);