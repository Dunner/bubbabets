// models/conversation.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Conversation Schema

var ConversationSchema = new Schema({
  users    : [Schema.Types.Mixed],
  messages : [
    {
      message: String,
      who: String,
      createdAt: Date,
    }
  ]
});

mongoose.model('Conversation', ConversationSchema);