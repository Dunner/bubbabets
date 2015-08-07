


module.exports = function(app, io) {

  //Socket

  global.userlist = {};

  io.sockets.on('connection', function(socket){

    socket.on('new user', function(userid){
      console.log(userid+' Logged in.');
      if (global.userlist[socket.userid] === userid) return;
      if (userid === 'userid') return;
      socket.userid = userid;
      global.userlist[socket.userid] = socket;
      io.sockets.emit('userlist', Object.keys(global.userlist));
    });

    socket.on('new topic', function(data){
      io.sockets.emit('new topic', data);
    });

    socket.on('new news', function(data){
      io.sockets.emit('new news', data);
    });

    socket.on('new globalchat', function(data){
      data.createdAt = Date.now();
      io.sockets.emit('new globalchat', data);
    });

    socket.on('new privatechat', function(data){
      var to = data.to;

      if(to in global.userlist){
        global.userlist[to].emit('new privatechat', data.message);
      }
    });

    socket.on('userlist', function(data){
      io.sockets.emit('userlist', Object.keys(global.userlist));
    });


    socket.on('logout', function(data){
      if(!data) return;
      delete global.userlist[socket.userid];
      io.sockets.emit('userlist', Object.keys(global.userlist));
      console.log(data+' logged out.');
    });

    socket.on('disconnect', function(data){
      if(!socket.userid) return;
      delete global.userlist[socket.userid];
      io.sockets.emit('userlist', Object.keys(global.userlist));
      console.log(socket.userid+' logged out.');
    });

  });

};