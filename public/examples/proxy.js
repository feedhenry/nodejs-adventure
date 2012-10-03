#!/usr/bin/env node
var net = require('net');

var proxyServer = net.createServer(function(client){
  // create onward connection to target server on port 2200
  var targ = net.createConnection(2000, function(){
    client.pipe(targ);
    targ.pipe(client);
  });
});

proxyServer.listen(3000, function(){
  console.log("listening on 3000");
});


/* Now run the following in individual shells:

# run our server on port 2000
$ nc -l 2000 
# run our proxy on port 3000
$ ./proxy.js
# client connection to our proxy on 3000
$ nc localhost 3000 
# anything you type in client shell should appear on server 
# and visa versa, typing in the server shell will appear in client
*/