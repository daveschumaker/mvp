/** 
 * Controller for our video view.
 */

angular.module('zilchcast.recent', [])

.controller('recentController', function($scope, $sce, GetVideo) {
  $scope.video = {}

  $scope.getRecent = function() {
    GetVideo.recentVids()
      .then(function(video) {
        $scope.video = video;
        //$scope.video = video;
        //$scope.video.url = video.url;
        //$scope.video.html = '<iframe width="560" height="315" src="' + $scope.video.url + '" frameborder="0" allowfullscreen></iframe>';
        //$scope.displayHTML = $sce.trustAsHtml($scope.video.html);
        console.log(video);
      })
  }

  $scope.getRecent();
});