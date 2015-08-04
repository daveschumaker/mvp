/**
 * Controller that will interface
 * with YouTube API... hopefully.
 */

var request = require("request");
var api = require('../api-config.js');

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

// Template for adding some fake data for now.
// { url: 'xxx' },
// 
// 
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=apiKey&q=cats&order=viewCount&maxResults=50&publishedAfter=2015-08-02T00%3A00%3A00Z

// Import our YouTube API key
var apiKey = api.apiKey();

// Send a GET request to YouTUbe with a query search string
request("https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey + "&q=corgis&order=viewCount&maxResults=50&publishedAfter=2015-08-02T00%3A00%3A00Z", function(error, response, body) {
  var data = JSON.parse(body);

  data.items.forEach(function(item, index) {
    var videoID = item.id.videoId;
    var embedID = 'https://www.youtube.com/embed/' + videoID;
    videoObj.push({url: embedID});
    console.log('Adding... ', embedID);
  });

  console.log(data);
  console.log(data.items[0].id.videoId)
  // console.log('VIDEO ID: ', JSON.parse(body.items.videoId))
});

module.exports = {
  getRandom: function() {
    var video = videoObj[Math.floor(Math.random()*videoObj.length)];
    return video;  
  },

  new: function() {
    return this.getRandom();
  }
}
