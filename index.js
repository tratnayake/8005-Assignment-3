var net = require('net');
var fs = require('fs');
var lineReader = require('line-reader');

var services = new Array();

//MAIN//
//Read from config file
lineReader.eachLine(__dirname+'/configfile.txt', function(line, last) {

  if(line[0] !="/"){
    arguments = line.split(",");
    console.log("The arguments are "+arguments);
    var ip = arguments[1];
    var service = arguments[0];
    var listenPort = arguments[2];
    var remotePort = arguments[3];

    var serviceElement = {ip: ip, service: service, listenPort: listenPort, remotePort: remotePort};
    services.push(serviceElement);


  }

  if(last){
    console.log("Start the listening servers and begin forwarding...");

    // Start listening & then start the server
    for (var i = 0; i < services.length; i++) {
      var serviceElement = services[i];
      listenPackets(serviceElement.remotePort,serviceElement.ip,serviceElement.service,serviceElement.listenPort,startPortServer);
    }



  }
});


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

    console.log(service + " client connected");

    conn.on('end',function(){
      console.log(service + " client disconnected");
    })

    conn.on('data',function(data){
      client.write(data);

    })
  });

startPortServer(server,service,listenPort);

}


//Start the server
function startPortServer(server,service,listenPort){
  server.listen(listenPort,function(){
    console.log(service + " server listening on port " + listenPort + " ..");
  });


}
