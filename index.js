var net = require('net');

// Sending shit out
  var echoServer = net.createServer(function(conn){

    var echoClient = net.createConnection(9000,"192.168.0.21",
      function(){
        console.log("Connected to the echoServer!");
        }
    );

    //Getting shit in
    echoClient.on('data',function(data){
      console.log("Got data back");
      //console.log(echoServer);
      conn.write(data);
    });

  console.log("echoClient connected");

  conn.on('end',function(){
    console.log("echoClient disconnected");
  })

  conn.on('data',function(data){
    console.log("Data on wire..");
    echoClient.write(data);

  })
});


////
// Sending shit out
  var httpServer = net.createServer(function(conn){

    console.log("Something happened on HTTP...");

    var httpClient = net.createConnection(9080,"192.168.0.21",
      function(){
        console.log("Connected to the httpServer!");
        }
    );

    //Getting shit in
    httpClient.on('data',function(data){
      console.log("Got data back");
      //console.log(httpServer);
      conn.write(data);
    });

  console.log("httpClient connected");

  conn.on('end',function(){
    console.log("httpClient disconnected");
  })

  conn.on('data',function(data){
    console.log("Data on wire..");
    httpClient.write(data);

  })
});


////
// Sending shit out
  var sshServer = net.createServer(function(conn){

    console.log("Something happened on HTTP...");

    var sshClient = net.createConnection(9022,"192.168.0.21",
      function(){
        console.log("Connected to the sshServer!");
        }
    );

    //Getting shit in
    sshClient.on('data',function(data){
      console.log("Got data back");
      //console.log(sshServer);
      conn.write(data);
    });

  console.log("sshClient connected");

  conn.on('end',function(){
    console.log("sshClient disconnected");
  })

  conn.on('data',function(data){
    console.log("Data on wire..");
    sshClient.write(data);

  })
});



//Start the echoServer
echoServer.listen(8080,function(){
  console.log("Server listening on port 8080..");
});

//Start the echoServer
httpServer.listen(80,function(){
  console.log("HTTP Server listening on port 80..");
});
//Start the SSHServer
sshServer.listen(22,function(){
  console.log("SSH Server listening on port 22..");
});
