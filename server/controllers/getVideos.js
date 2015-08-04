/**
 * Controller that will interface
 * with YouTube API... hopefully.
 */

var request = require("request");
var Firebase = require("firebase");
var api = require('../api-config.js');

var myFirebaseRef = new Firebase("https://blistering-torch-3329.firebaseio.com/");
var dbVideos = myFirebaseRef.child("videos");

// Hard coding a number of videos to test out our API.
// TODO: Replace this with some serious API calls
var videoObj = [
  { url: 'https://www.youtube.com/embed/tLt5rBfNucc' },
  { url: 'https://www.youtube.com/embed/oVXZTmi2ruI' },
  { url: 'https://www.youtube.com/embed/jcgWHD-Leps' },
  { url: 'https://www.youtube.com/embed/rGy6tu6716w' },
  { url: 'https://www.youtube.com/embed/KmuVO4UObwA' },
  { url: 'https://www.youtube.com/embed/OjdQa-yc0QM' },
  { url: 'https://www.youtube.com/embed/x69X482ujLY' },
  { url: 'https://www.youtube.com/embed/8YrAILSxbq0' },
  { url: 'https://www.youtube.com/embed/yD3yVwC0fjg' },
];

// Push videos here so we can check it we've already added them.
var videoArray = [
  'tLt5rBfNucc',
  'oVXZTmi2ruI',
  'jcgWHD-Leps',
  'rGy6tu6716w',
  'KmuVO4UObwA',
  'OjdQa-yc0QM',
  'x69X482ujLY',
  '8YrAILSxbq0',
  'yD3yVwC0fjg'
];


// Template for adding some fake data for now.
// { url: 'xxx' },

// Import our YouTube API key
var apiKey = api.apiKey();
var requestVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey + "&q=corgis&order=date&maxResults=50&publishedAfter=2015-07-01T00%3A00%3A00Z";

// Send a GET request to YouTUbe with a query search string
var fetchVids = function() {
  request(requestVideosURL, function(error, response, body) {
    var data = JSON.parse(body);
    data.items.forEach(function(item, index) {

      // Now send a SECOND API request to YouTube that gets the statistics on this PARTICULAR video.
      var videoID = item.id.videoId;
      var requestURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=" + apiKey + "&id=" + videoID;

      request(requestURL, function(error, response, body) {
        var vidData = JSON.parse(body);
        // console.log(vidData.items);
        var getInfo = vidData.items;

        if (getInfo[0] === undefined) {
          // console.log('Undefined Value Found!!');
        } else {
          if (getInfo[0].statistics.viewCount < 5) {
            console.log('\n\n--------- INDIVIDUAL VIDEO\n');
            var embedID = 'https://www.youtube.com/embed/' + videoID;
            console.log('STATISTICS\n', getInfo[0].statistics);
            console.log(embedID);

            var tempKey = videoID;
            var tempURL = embedID;
            var vidObj = {};
            vidObj[tempKey] = {id: videoID, url: embedID };
            // myArray.push(obj);          


            // Write data to Firebase.
            dbVideos.child(videoID).set({
              id: videoID,
              url: embedID
            });

            // dbVideos.set(vidObj);

          }

          
        }

        //if (vidData.items[0].statistics) {
        //}
      })

      // videoObj.push({url: embedID});
      // console.log('Adding... ', embedID);
      // console.log(item.snippet);
    });
  });
}


module.exports = {
  getRandom: function() {
    var video = videoObj[Math.floor(Math.random()*videoObj.length)];
    return video;  
  },

  new: function() {
    return this.getRandom();
  },

  updateVideos: function() {
    console.log('Fetching new videos!');
    fetchVids();
  }
}
