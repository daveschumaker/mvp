/**
 * Initialize and setup our AngularJS App
 */

angular.module('zilchcast', [
  'zilchcast.popular',
  'zilchcast.recent',
  'zilchcast.video',
  'video.services',
  'ngRoute'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/video.html',
      controller: 'myVideoController'
    })
    .when('/popular', {
      templateUrl: 'app/views/popular.html',
      controller: 'popularController'
    })
    .when('/recent', {
      templateUrl: 'app/views/recent.html',
      controller: 'recentController'
    })
    .when('/test', {
      templateUrl: 'app/views/test.html',
      controller: 'myVideoController'      
    })
    .when("/video/:videoID/", {
      templateUrl: "app/views/video.html",
      controller: "myVideoController"
    })
    .otherwise({
      redirectTo: '/'
    });
})