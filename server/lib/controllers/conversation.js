// lib/controllers/conversation.js

var mongoose = require('mongoose'),
    async = require('async'),
    Conversation = mongoose.model('Conversation'),
    User = mongoose.model('User');

//Get all conversations of user
exports.conversations = function(req, res) {
  //Return conversation
  Conversation.find({
    users: req.params.id
    }, function (err, conversation) {
    if (err) {console.log(err); return res.json(500, err);}
    //remove our id
    async.each(conversation, 
      function(elem, callback) {

        var array = elem.users;
        var myid = array.indexOf(req.params.id);
        array.splice(myid, 1);

        User.findOne({
          '_id': array[0]
        }, function (err, user) {
          if (err) return res.json(500, err);
          if (user) {
            array[1] = user.public.name;
          };
          callback();
        });
      },
      function(err){
        if (err) return res.json(500, err);
        res.json(conversation);
      }
    );
  });


};

//
exports.conversation = function(req, res) {
  var users = req.body.users;
  //Return conversation
  Conversation.findOne({
    'userOneId': userOneId,
    'userTwoId': userTwoId
  }, function (err, conversation) {
    if (err) return res.json(500, err);
    res.json(conversation);
  });
};



// save a message

exports.save = function(req, res) {
  var users = req.body.users.sort();
  var message = req.body.message;
  users.sort();
  //Return conversation
  Conversation.findOne({
    'users':users 
  }, function (err, conversation) {
    if (!err) {
      if (conversation !== null) {
        //New message, update conversation
        conversation.messages.push(message);
        conversation.markModified('messages');
        conversation.save();
        res.json();
      } else {
        //No conversation, create one and add message
        // message.push({createdAt: 'lol'})
        var combined = new Conversation({
          users: users,
          messages : [message]
        });

        combined.save(function(err) {
          if (err) return res.json(500, err);
          res.json(combined);
        });
      }
    } else {
      console.log(err); return res.json(500, err);
    }

  });
};

