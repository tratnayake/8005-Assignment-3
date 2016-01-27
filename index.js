var net = require('net');

var services = require('./config'),
  serviceElement = [];

console.log("Start the listening servers and begin forwarding...");

// Start listening & then start the server
for (var i = 0; i < services.length; i++) {
  serviceElement = services[i];
  listenPackets(serviceElement.remotePort,serviceElement.ip,serviceElement.service,serviceElement.listenPort,startPortServer);
}

function listenPackets(remotePort,ip,service,listenPort,startPortServer){

  // To send data out
  var server = net.createServer(function(conn){

    var client = net.createConnection(remotePort,ip,
      function(){
        console.log(service + " client connected to the server!");
        }
    );

    //To get Data In
    client.on('data',function(data){
      //console.log(server);
      conn.write(data);
    });

    client.on('error', function(err) {
      console.log(service + ' connector error: ' + err.message);
      if (err.code == 'ENOTFOUND') {
        conn.end('ERROR: Remote host is unavailable' + "\n");
      } else {
        conn.write('ERROR: Remote host error' + "\n");
      }
    });

    console.log(service + " client connected");

    conn.on('end',function(){
      console.log(service + " client disconnected");
    });

    conn.on('data',function(data){
      client.write(data);
    });
  });

  startPortServer(server,service,listenPort);

}


//Start the server
function startPortServer(server,service,listenPort){
  server.listen(listenPort,function(){
    console.log(service + " server listening on port " + listenPort + " ..");
  });


}
