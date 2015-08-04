/**
 * Initialize and setup our AngularJS App
 */

angular.module('zilchcast', [
  'zilchcast.video',
  'video.services',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/video.html',
      controller: 'myVideoController'
    })
    .when('/popular', {
      templateUrl: 'app/views/popular.html',
      controller: 'myVideoController'
    })
    .when('/recent', {
      templateUrl: 'app/views/recent.html',
      controller: 'myVideoController'
    })
    .when('/test', {
      templateUrl: 'app/views/test.html',
      controller: 'myVideoController'      
    })
    .otherwise({
      redirectTo: '/'
    });
})