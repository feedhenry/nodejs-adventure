var util = require('util');
var stream = require('stream');
var Stream = require('stream').Stream;

// Processes data from stdin into a Stream of individual data chunks
function StdinSplitter() {
  var self = this;
  this.writable = true;
  this.readable = true;

}
util.inherits(StdinSplitter, Stream);

StdinSplitter.prototype.write = function(data) {
  if(data) {
    if (typeof data === 'object') data = data.toString();
    var ar = data.split('\n');
    if (ar.length > 0) {    
      for (var i=0; i<ar.length; i++) {
        var d = ar[i];
        if (d && d !== '') this.emit('data', d); 
      }
    }else this.emit('data', data);
  }
};

StdinSplitter.prototype.end = function() {
  this.emit('end');
};

StdinSplitter.prototype.destroy = function() {
  this.emit('close');
};

StdinSplitter.prototype.error = function(err) {
  this.emit('error', err);
};

exports.StdinSplitter = StdinSplitter;