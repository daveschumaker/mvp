/**
 * Controller that will interface
 * with YouTube API... hopefully.
 */


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

module.exports = {
  getRandom: function() {
    var video = videoObj[Math.floor(Math.random()*videoObj.length)];
    return video;  
  },

  new: function() {
    return this.getRandom();
  }
}
