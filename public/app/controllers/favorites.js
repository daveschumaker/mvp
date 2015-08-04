/** 
 * Controller for our video view.
 */

angular.module('zilchcast.popular', [])

.controller('popularController', function($scope, $sce, GetVideo) {
  $scope.video = {}

  $scope.visitVideo = function(vidID) {
    window.location = '#/video/' + vidID;
  }

  $scope.getPop = function() {
    GetVideo.popularVids()
      .then(function(video) {
        $scope.video = video;
        //$scope.video = video;
        //$scope.video.url = video.url;
        //$scope.video.html = '<iframe width="560" height="315" src="' + $scope.video.url + '" frameborder="0" allowfullscreen></iframe>';
        //$scope.displayHTML = $sce.trustAsHtml($scope.video.html);
        console.log(video);
      })
  }

  $scope.getPop();
});