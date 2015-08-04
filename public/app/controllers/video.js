/** 
 * Controller for our video view.
 */

angular.module('zilchcast.video', [])

.controller('myVideoController', function($scope, $sce, GetVideo) {
  $scope.video = {
    url: null,
    html: null
  }

  $scope.liked = function() {
    GetVideo.vidAction('liked', $scope.video);
  }

  $scope.disliked = function() {
    GetVideo.vidAction('disliked', $scope.video);
  }  

  $scope.getVideo = function() {
    GetVideo.newVideo()
      .then(function(video) {
        $scope.video = video;
        //$scope.video.url = video.url;
        $scope.video.html = '<iframe width="560" height="315" src="' + $scope.video.url + '" frameborder="0" allowfullscreen></iframe>';
        $scope.displayHTML = $sce.trustAsHtml($scope.video.html);
        console.log($scope.video);
      })
  }

  $scope.getVideo();
});