'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('FeedCtrl', function ($scope, socket, BulletinService, MessageService, $filter, $timeout) {
    $scope.activeFeed = 'news';
		$scope.unreadPrivate = 0;
		$scope.unreadGlobal = 0;
    $scope.MessageService = MessageService;
    $scope.target = MessageService.getTarget();
    var onlineUsers = [];
    socket.emit('userlist');

    $scope.changeFeed = function (feed) {
      $scope.activeFeed = feed;
    	if ($scope.activeFeed === 'global') {
				$scope.unreadGlobal = 0;
    	}
      if ($scope.activeFeed === 'messages') {
        $scope.unreadPrivate = 0;
      }
      MessageService.closeChat();
    };

    socket.on('new globalchat', function(message){
    	if ($scope.activeFeed !== 'global') {
    		$scope.unreadGlobal++;
    	}
      message.createdAt = $filter('date')(message.createdAt, 'yyyy-MM-ddTHH:mm:ss');
      BulletinService.pushMessage(message);
    });

    socket.on('new privatechat', function(data){
      $scope.unreadPrivate++;
      MessageService.joinMessage(data);
      $timeout(function(){
        var objDiv = document.getElementById('scroller');
        objDiv.scrollTop = objDiv.scrollHeight;
      },100);
    });


    socket.on('userlist', function(data){
      onlineUsers = data;
      console.log('online users: '+onlineUsers.length);
      $scope.$apply();
    });

    $scope.isOnline = function(id) {
      if(onlineUsers.indexOf(id) > -1) {
        return true;
      }
    };

    $scope.activeDropdown= function(index){
      if ($scope.activeDropdownIndex === index) {
        $scope.activeDropdownIndex = -1;
        return;
      }
      $scope.activeDropdownIndex = index;
    };

  });
