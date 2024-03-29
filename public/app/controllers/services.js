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
      return resp.data;
    });
  }

  var getOneVideo = function(data) {
    return $http({
      method: 'POST',
      url: '/api/video/get/',
      data: data
    })
    .then(function (resp) {
      console.log('Response Received!!!!', resp.data);
      return resp.data;
    });    
  }

  var popularVids = function() {
    return $http({
      method: 'GET',
      url: '/api/video/popular'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  var recentVids = function() {
    return $http({
      method: 'GET',
      url: '/api/video/recent'
    })
    .then(function (resp) {
      console.log(resp);
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
      return resp.data;
    });
  }

  return {
    getOneVideo: getOneVideo,
    newVideo: newVideo,
    popularVids: popularVids,
    recentVids: recentVids,
    vidAction: vidAction
  }
});