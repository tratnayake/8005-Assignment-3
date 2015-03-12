var net = require('net');

//Get comand line arguments
//To run use node index.js ssh 192.168.0.3 22 9022
var arguments = process.argv.slice(2);
var ip = arguments[2];
var service = arguments[1]
var listenPort = arguments[3]
var remotePort = arguments[4];

// To send data out
  var server = net.createServer(function(conn){

    var client = net.createConnection(remotePort,ip,
      function(){
        console.log("Connected to the server!");
        }
    );

    //To get Data In
    client.on('data',function(data){
      console.log("Got data back");
      //console.log(server);
      conn.write(data);
    });

  console.log("client connected");

  conn.on('end',function(){
    console.log("client disconnected");
  })

  conn.on('data',function(data){
    console.log("Data on wire..");
    client.write(data);

  })
});


//Start the server
server.listen(listenPort,function(){
  console.log("Server listening on port 8080..");
});
