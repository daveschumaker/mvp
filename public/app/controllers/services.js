/** 
 * Services file.
 */

angular.module('video.services', [])

.factory('GetVideo', function($http) {
  var newVideo = function() {
    return $http({
      method: 'GET',
      url: '/api/video/new'
    })
    .then(function (resp) {
      console.log(resp.data);
      return resp.data;
    });
  }

  return {
    newVideo: newVideo
  }
});