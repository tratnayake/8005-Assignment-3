var net = require('net');

//Get comand line arguments
//To run use node index.js ssh 192.168.0.3 22 9022
var arguments = process.argv.slice(2);
var ip = arguments[1];
var service = arguments[0];
var listenPort = arguments[2];
var remotePort = arguments[3];

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


//Start the server
server.listen(listenPort,function(){
  console.log(service + " server listening on port 8080..");
});
