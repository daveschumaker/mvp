/**
 * ZilchCast v.0.0.2
 * by Dave Schumaker
 *
 * MVP Project for Hack Reactor, cohort 31
 * August 3rd, 2015
 */

// Import and require various modules
var express = require('express');
var videos = require('./server/controllers/getVideos.js');
var YTapi = require('./server/api-config.js');

// Initialize Express
var app = express();

// Route handling.
// TODO: Move this into its own module
app.use(express.static(__dirname + '/public'));

// Handle API requests
app.get('/api/video/new', function(req,res) {
 res.statusCode = 200;
 var newVideo = videos.newVid();
 console.log('New video requested: ', newVideo); 
 res.send(newVideo);
});

var searchCriteria = [
  'baseball',
  'basketball',
  'boring',
  'cats',
  'coding',
  'corgis',
  'dogs',
  'driving',
  'eating',
  'fail',
  'family',
  'food',
  'funny',
  'karate',
  'nature',
  'random',
  'school',
  'sharks',
  'twitter',
  'work'
]

// Periodically update list of videos.
// videos.updateVideos(); // Fetch videos on server load.
setInterval(function() {
  var searchQry = searchCriteria[Math.floor(Math.random()*searchCriteria.length)];
  console.log('Now searching for... ' + searchQry);
  videos.updateVideos(searchQry);
}, 5000);

// Setup server and start listening.
var port = 3002;
var server = app.listen(port, function() {
  var port = server.address().port;
  console.log('ZilchCast Server online and listening on port ' + port);
});