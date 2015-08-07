// lib/controllers/topic.js

var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    Topic = mongoose.model('Topic');

// Find message by id and store it in the request
exports.message = function(req, res, next, id) {
  Topic.findById(id, function(err, message) {
    if (err) return next(err);
    if (!message) return next(new Error('Failed to load message ' + id));
    req.message = message;
    next();
  });
};

// List of messages
exports.query = function(req, res) {
  //Return conversation
  Topic.find().sort('-createdAt').limit(10).exec(function(err, topic) {
    if (err) {console.log(err); return res.json(500, err);}
    //remove our id
    async.each(topic,
      function(elem, callback) {
        User.findOne({
          '_id': elem.user.id
        }, function (err, user) {
          if (err) return res.json(500, err);
          if (user) {
            elem.user.name = user.public.name
          };
          callback();
        });
      },
      function(err){
        if (err) return res.json(500, err);
        res.json(topic);
      }
    );
  });
};

// Show a message
exports.show = function(req, res) {
  Topic.findOne({
    'titleslug': req.params.slug
  }, function (err, topic) {
    if (err) return res.json(500, err);
    User.findOne({
      '_id': topic.user.id
    }, function (err, user) {
      if (err) return res.json(500, err);
      if (user) {
        topic.user.name = user.public.name

        async.each(topic.comments,
          function(comment, callback) {
            User.findOne({
              '_id': comment.user.id
            }, function (err, user) {
              if (err) return res.json(500, err);
              if (user) {
                comment.user.name = user.public.name
              };
              callback();
            });
          },
          function(err){
            if (err) return res.json(500, err);
            res.json(topic);
          }
        );
        
      };
    });
  });
};

// Create a message
exports.create = function(req, res) {
  var message = new Topic({
    title: req.body.title,
    titleslug: req.body.titleslug,
    content: req.body.content,
    category: req.body.category,
    user: {
      id: req.body.byid,
      name: ''
    }
  });

  message.save(function(err) {
    if (err) return res.json(500, err);
    res.json(message);
  });
};


// Update a message

exports.update = function(req, res) {
  Topic.update({ _id: req.message._id }, req.body, { }, function(err, updatedTopic) {
    if (err) return res.json(500, err);
    res.json(updatedTopic);
  });
};


// Remove a message

exports.remove = function(req, res) {
  var message = req.message;

  message.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(message);
  });
};


// Create a comment
exports.comment = function(req, res) {
  var id = String(req.body.id);
  Topic.findOne({
    '_id': id
  }, function (err, topic) {
    if (err) return res.send(400);

    topic.comments.push({
      user: {
        id: req.body.user,
        name: 'test'
      },
      comment: req.body.comment
    })

    topic.save(function(err){
      if(err) { console.log(err); return res.send(400); }
      return res.send('worked');
    });

  });
};
