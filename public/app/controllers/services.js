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

  var vidAction = function(action, data) {
    // action == either "like" or "dislike"

    return $http({
      method: 'POST',
      url: '/api/video/' + action,
      data: data
    })
    .then(function (resp) {
      console.log(resp.data);
      return resp.data;
    });
  }


  return {
    newVideo: newVideo,
    vidAction: vidAction
  }
});