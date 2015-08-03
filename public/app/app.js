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
    .otherwise({
      redirectTo: '/'
    });
})