// lib/controllers/bulletin.js

var mongoose = require('mongoose'),
    Bulletin = mongoose.model('Bulletin');

// Find message by id and store it in the request
exports.message = function(req, res, next, id) {
  Bulletin.findById(id, function(err, message) {
    if (err) return next(err);
    if (!message) return next(new Error('Failed to load message ' + id));
    req.message = message;
    next();
  });
};

// List of messages
exports.query = function(req, res) {
  Bulletin.find().sort('-createdAt').limit(10).exec(function(err, bulletin) {
    if (err) return res.json(500, err);
    res.json(bulletin);
  });
};

// Show a message
exports.show = function(req, res) {
  res.json(req.message);
};

// Create a message
exports.create = function(req, res) {
  var message = new Bulletin(req.body);

  message.save(function(err) {
    if (err) return res.json(500, err);
    res.json(message);
  });
};


// Update a message

exports.update = function(req, res) {
  Bulletin.update({ _id: req.message._id }, req.body, { }, function(err, updatedMessage) {
    if (err) return res.json(500, err);
    res.json(updatedMessage);
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