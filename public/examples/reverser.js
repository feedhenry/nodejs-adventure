#!/usr/local/bin/node

var util = require('util');
var stream = require('stream');
var stdinsplitter = require('./stdinsplitter.js');

// Reverser Stream - reverse any data piped in
function Reverser() {
  this.writable = true;
  this.readable = true;
}
util.inherits(Reverser, stream.Stream);

// Do the reversing
Reverser.prototype.write = function(data) {
  var self = this;
  self.emit('data', data.split("").reverse().join("") + "\n");
};

// handling 'end' is required, should also handle 'error', 'destroy', etc
Reverser.prototype.end = function() {
  this.emit('end');
};

// Check something is being streamed in.. 
if (!process.stdin.readable || process.stdin.readable !== true) { 
  console.log("No stdin stream to process.. Stream me some data, e.g. ls -1 |./reverse.js");
  process.exit(1);
}

// Create our Read/Write Streamers
var splitter = new stdinsplitter.StdinSplitter();
var reverser = new Reverser();

// un-pause the stdin stream
process.stdin.resume();

// set up pipe plumbing:
// stdin | splitter | reverser | stdout
process.stdin.pipe(splitter);
splitter.pipe(reverser);
reverser.pipe(process.stdout);

// Note Common gotcha - if a stream uses async functions internally, pass { end: false }

