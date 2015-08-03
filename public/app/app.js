/**
 * Initialize and setup our AngularJS App
 */

angular.module('ZilchCast', [
  'ZilchCast.video',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/video.html',
      controller: 'myZilchController',
    })
    .otherwise({
      redirectTo: '/'
    });
})