'use strict';

/**
 * @ngdoc service
 * @name lightApp.auth
 * @description
 * # auth
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('Auth', function Auth($state, $rootScope, Session, User, $cookieStore, socket, $resource) {
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    //Tell node we're online
    if ($rootScope.currentUser !== null) {
      socket.emit('new user', $rootScope.currentUser._id);
    }
    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          email: user.email,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(user) {
          if (user._id !== undefined) {
          $rootScope.currentUser = user;
            socket.emit('new user', user._id);
            return cb();
          }
        }, function(err) {
          return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        Session.delete(function() {
          $rootScope.currentUser = null;
          socket.disconnect();
          return cb();
        },
        function(err) {
          return cb(err.data);
        });
      },

      createUser: function(userinfo, callback) {
        console.log(userinfo);
        var cb = callback || angular.noop;
        $resource('/api/users/signup').save(userinfo,
          function() {
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      currentUser: function() {
        Session.get(function(user) {
          $rootScope.currentUser = user;
          console.log(user);
        });
      },

      changeName: function(email, password, name, slug, callback) {
        var cb = callback || angular.noop;
        User.update({
          email: email,
          password: password,
          name: name,
          slug: slug
        }, function() {
            console.log('name changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      changePassword: function(email, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        User.update({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function() {
            console.log('password changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      removeUser: function(email, password, callback) {
        var cb = callback || angular.noop;
        User.delete({
          email: email,
          password: password
        }, function(user) {
            console.log(user + 'removed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      }
    };
  });