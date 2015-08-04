/**
 * Controller that will interface
 * with YouTube API... hopefully.
 */

var request = require("request");
var Firebase = require("firebase");
var api = require('../api-config.js');

var myFirebaseRef = new Firebase("https://blistering-torch-3329.firebaseio.com/");
var dbVideos = myFirebaseRef.child("videos");

// Import our YouTube API key
var apiKey = api.apiKey();

// Send a GET request to YouTUbe with a query search string
var fetchVids = function(searchQry) {
  var searchQry = searchQry || "corgis"
  var requestVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey + "&q=" + searchQry + "&order=date&maxResults=50&publishedAfter=2015-07-01T00%3A00%3A00Z";
  request(requestVideosURL, function(error, response, body) {
    if (body === undefined) { console.log('Undefined body!'); body = ''; };
    var data = JSON.parse(body);
    data.items.forEach(function(item, index) {

      // Now send a SECOND API request to YouTube that gets the statistics on this PARTICULAR video.
      var videoID = item.id.videoId;
      var requestURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=" + apiKey + "&id=" + videoID;

      request(requestURL, function(error, response, body) {
        if (body === undefined) { console.log('Undefined body!'); body = ''; };
        var vidData = JSON.parse(body);
        // console.log(vidData.items);
        var getInfo = vidData.items;

        if (getInfo[0] === undefined) {
          // console.log('Undefined Value Found!!');
        } else {
          if (getInfo[0].statistics.viewCount < 5) {
            // console.log('\n\n--------- INDIVIDUAL VIDEO\n');
            var embedID = 'https://www.youtube.com/embed/' + videoID;
            // console.log('STATISTICS\n', getInfo[0].statistics);
            // console.log(embedID);

            var tempKey = videoID;
            var tempURL = embedID;
            var vidObj = {};
            vidObj[tempKey] = {id: videoID, url: embedID };

            // Write data to Firebase.
            dbVideos.child(videoID).set({
              id: videoID,
              url: embedID
            });
          } 
        }
      });
    });
  });
};

var allVids = [];
var getAllVids = function() {
  // GET DATA BACK FROM SERVER!
  var allData = [];
  dbVideos.on("value", function(snapshot) {
    for (var key in snapshot.val()) {
      // console.log(snapshot.val()[key]);
      allData.push(snapshot.val()[key]);
    }
    // console.log(allData);
    allVids = allData;
    return allData;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

getAllVids();
// This is a hacky way to get around asynchronous stuff...
setInterval(function(){
  // console.log('Fetching video content...');
  getAllVids();  
}, 5000);

module.exports = {
  getRandom: function() {
    // console.log(allVids);
    var video = allVids[Math.floor(Math.random()*allVids.length)];
    return video;  
  },
  newVid: function() {
    return this.getRandom();
  },
  updateVideos: function(searchQry) {
    // console.log('Fetching new videos!');
    fetchVids(searchQry);
  }
};
