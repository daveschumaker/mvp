/** 
 * Controller for our video view.
 */

angular.module('zilchcast.video', [])

.controller('myVideoController', function($scope) {
  $scope.test = function() {
    console.log('HELLO?');
  }

  $scope.test();
});