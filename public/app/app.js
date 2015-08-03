/**
 * Initialize and setup our AngularJS App
 */

angular.module('zilchcast', [
  'zilchcast.video',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/video.html',
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