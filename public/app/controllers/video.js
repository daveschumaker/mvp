/** 
 * Controller for our video view.
 */

angular.module('zilchcast.video', [])

.controller('myVideoController', function($scope, $sce, GetVideo) {
  $scope.video = {
    url: null,
    html: null
  }

  $scope.getVideo = function() {
    GetVideo.newVideo()
      .then(function(video) {
        $scope.video.url = video.url;
        $scope.video.html = '<iframe width="560" height="315" src="' + $scope.video.url + '" frameborder="0" allowfullscreen></iframe>';
        $scope.video.html = $sce.trustAsHtml($scope.video.html);
        console.log('HELLO?', $scope.video.url);
      })
  }

  $scope.getVideo();
});