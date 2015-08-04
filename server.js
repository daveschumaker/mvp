/**
 * ZilchCast v.0.0.2
 * by Dave Schumaker
 *
 * MVP Project for Hack Reactor, cohort 31
 * August 3rd, 2015
 */

// Import and require various modules
var express = require('express');
var bodyParser = require('body-parser')
var videos = require('./server/controllers/getVideos.js');
var YTapi = require('./server/api-config.js');

// Initialize Express
var app = express();

// Route handling.
// TODO: Move this into its own module
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Handle API requests
app.get('/api/video/new', function(req,res) {
 res.statusCode = 200;
 var newVideo = videos.newVid();
 console.log('New video requested: ', newVideo); 
 res.send(newVideo);
});

app.get('/api/video/popular', function(req,res) {
 res.statusCode = 200;
 var newVids = videos.getMostPopular();
 res.send(newVids);
});

app.post('/api/video/liked', function(req, res) {
  videos.likeVideo(req.body);
  console.log(req.body);
  console.log('Liked video!');
});

app.post('/api/video/disliked', function(req, res) {
  videos.dislikeVideo(req.body);
  console.log(req.body);
  console.log('Disliked video!');
});

videos.updateVideos('cats%20OR%20cat%20OR%20kittens');
// Periodically update list of videos.
// videos.updateVideos(); // Fetch videos on server load.
setInterval(function() {
  //var searchQry = searchCriteria[Math.floor(Math.random()*searchCriteria.length)];
  //console.log('Now searching for... ' + searchQry);
  videos.updateVideos('cats%20OR%20cat%20OR%20kittens');
}, 60000);

// Setup server and start listening.
var port = 3002;
var server = app.listen(port, function() {
  var port = server.address().port;
  console.log('ZilchCast Server online and listening on port ' + port);
});