/**
 * ZilchCast v.0.0.1
 * by Dave Schumaker
 *
 * MVP Project for Hack Reactor, cohort 31
 * August 3rd, 2015
 */

// Import and require various modules
var express = require('express');
var videos = require('./server/controllers/getVideos.js');

// Initialize Express
var app = express();

// Route handling.
// TODO: Move this into its own module
app.use(express.static(__dirname + '/public'));

// Handle API requests
app.get('/api/video/new', function(req,res) {
 res.statusCode = 200;
 var newVideo = videos.new();
 console.log('New video requested: ', newVideo); 
 res.send(newVideo);
});

// Figure out route handling later.
// app.get('/', function(req,res) {
//   console.log('BOOM!!!');w
//   res.end();
// });


// Setup server and start listening.
var port = 3002;
var server = app.listen(port, function() {
  var port = server.address().port;
  console.log('ZilchCast Server online and listening on port ' + port);
});