/**
 * Controller that will interface
 * with YouTube API... hopefully.
 */

var request = require("request");
var Sequelize = require('sequelize');

var sequelize = new Sequelize('videos', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'server/db/video.sqlite'
});

var Video = sequelize.define('Video', {
  vid_id: Sequelize.STRING,
  title: Sequelize.STRING,
  url: Sequelize.STRING,
  html: Sequelize.STRING,
  views: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
  dislikes: Sequelize.INTEGER
});

sequelize.sync();


var sanitizeHtml = require('sanitize-html');
var api = require('../api-config.js');

// Import our YouTube API key
var apiKey = api.apiKey();

var getPopular = function() {

}

getPopular();

// Check if video exists in our data. If not, save it.
var likeVid = function(data) {
  var likeCount = 0;
  Video.findOne({where: {vid_id: data.vid_id} }).then(function(vid) {
    likeCount = vid.dataValues.likes;
    likeCount++;
    Video.update({likes: likeCount}, {where: {vid_id: vid.dataValues.vid_id}}); // Add like count to this video.
  });
}

// Check if video exists in our data. If not, save it.
var hateVid = function(data) {
  var dislikeCount = 0;
  Video.findOne({where: {vid_id: data.vid_id} }).then(function(vid) {
    dislikeCount = vid.dataValues.dislikes;
    dislikeCount++;
    Video.update({dislikes: dislikeCount}, {where: {vid_id: vid.dataValues.vid_id}}); // Add like count to this video.
  });
}

// Send a GET request to YouTUbe with a query search string
var fetchVids = function(searchQry) {
  var searchQry = searchQry || "corgis"
  var requestVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey + "&q=" + searchQry + "&order=date&maxResults=5&publishedAfter=2015-07-01T00%3A00%3A00Z";
  request(requestVideosURL, function(error, response, body) {
    if (body === undefined) { console.log('Undefined body!'); return };
    var data = JSON.parse(body);
    data.items.forEach(function(item, index) {

      // Now send a SECOND API request to YouTube that gets the statistics on this PARTICULAR video.
      var videoID = item.id.videoId;
      var requestURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=" + apiKey + "&id=" + videoID;

      var embedID = 'https://www.youtube.com/embed/' + videoID;

      if (videoID != undefined || videoID != null) {
        // Check if video already exists in our database.
        Video.findOne({ where: {vid_id: videoID} }).then(function(vid) {
          if (vid === null) {
            Video.sync().then(function () {
              // Table created
              return Video.create({
                vid_id: videoID,
                title: item.snippet.title,
                url: embedID,
                views: 0,
                likes: 0,
                dislikes: 0
              });
            });          
          }
        })
      }
    });
  });
};

var allVids = [];
var getAllVids = function() {
  // GET DATA BACK FROM DATABASE!
  var allData = [];
  sequelize.query("SELECT * FROM 'Videos' WHERE dislikes < 2", { type: sequelize.QueryTypes.SELECT})
    .then(function(vid) {
      allVids = vid;
    })
};

// Popular videos
var popVids = [];
var getPopVids = function() {
  sequelize.query("SELECT * FROM Videos ORDER BY likes DESC LIMIT 10", { type: sequelize.QueryTypes.SELECT})
    .then(function(vid) {
      popVids = vid;
    })  
}

getAllVids();
getPopVids();
// This is a hacky way to get around asynchronous stuff...
setInterval(function(){
  getAllVids(); 
  getPopVids(); 
}, 30000);

module.exports = {
  getRandom: function() {
    // console.log(allVids);
    var video = allVids[Math.floor(Math.random()*allVids.length)];
    return video;  
  },
  getOneVideo: function(data, res) {
    sequelize.query("SELECT * FROM Videos WHERE vid_id='" + data.vid_id +"'", { type: sequelize.QueryTypes.SELECT})
      .then(function(vid) {
        res.send(vid[0]);
      }) 
  },
  getMostPopular: function() {
    return popVids;
  },
  getRecent: function(res) {
  sequelize.query("SELECT * FROM Videos ORDER BY createdAt DESC LIMIT 20", { type: sequelize.QueryTypes.SELECT})
    .then(function(vid) {
      res.send(vid);
    })  
  },
  newVid: function() {
    return this.getRandom();
  },
  likeVideo: function(data) {
    likeVid(data);
  },
  dislikeVideo: function(data) {
    hateVid(data);
  },
  updateVideos: function(searchQry) {
    // console.log('Fetching new videos!');
    fetchVids(searchQry);
  }
};
