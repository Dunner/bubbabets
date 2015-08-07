'use strict';

/**
 * @ngdoc overview
 * @name lightAppApp
 * @description
 * # lightAppApp
 *
 * Main module of the application.
 */
angular
  .module('lightApp', [
    'lightApp.BulletinService',
    'lightApp.BuddyService',
    'lightApp.TopicService',
    'lightApp.MessageService',
    'lightApp.BetService',
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'colorpicker.module',
    'textAngular',

    'btford.socket-io'
  ])
  .run(   ['$rootScope', '$state', '$window', 'Auth', '$timeout',
  function ($rootScope,   $state,   $window,   Auth,   $timeout) {
    //Global vars
    $rootScope.API = 'http://torst1.myftp.org:80/api/';

    //Statechange
    $rootScope.$on('$stateChangeStart', function () {
      $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeError', function () {
      console.log('STATE CHANGE ERROR');
    });
    $timeout(function(){
      if ($state.current.name === 'start') {
        console.log('state: '+$state.current.name);
        $state.go('signin');
      }
    },100);
    //Logout
    $rootScope.logout = function() {
      Auth.logout();
      $rootScope.currentUser = null;
      window.location.href = window.location.origin+'/signin';
    };

  }])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($locationProvider,   $stateProvider,   $urlRouterProvider,   $httpProvider) {
    // State Configurations //
    $httpProvider.defaults.withCredentials = true;

    $stateProvider
      .state('start', {
        url: '/',
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      // Logged in
      .state('social', {
        abstract: true,
        url: '',
        templateUrl: 'views/social.html',
        // resolve: {
        //   messages: ['BulletinService', function( BulletinService ) {
        //     return BulletinService.queryDB().$promise;
        //   }]
        // }
      })
      .state('social.overview', {
        url: '/overview',
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
      .state('social.betting', {
        url: '/betting',
        templateUrl: 'views/betting.html',
        controller: 'BettingCtrl'
      })
      .state('social.settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .state('social.users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .state('social.user', {
        url: '/user/{id}',
        templateUrl: 'views/user.html',
        resolve: {
          user: ['User', '$stateParams', function( User, $stateParams ) {
            return User.get({id: $stateParams.id}).$promise;
          }]
        },
        controller: 'UserCtrl'
      })
      .state('social.topics', {
        url: '/topic',
        templateUrl: 'views/topics.html',
        controller: 'TopicsCtrl'
      })
      .state('social.topic', {
        url: '/topic/{slug}',
        templateUrl: 'views/topic.html',
        controller: 'TopicCtrl'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }]);