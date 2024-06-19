const net = require("net");
const RequestController = require("./request.controller");
const serverIP = "68.46.244.148";
const serverPort = "10135";
// Create a server object
const server = net.createServer((socket) => {
  // Handle incoming data
  console.log("Client connected");
  const schem = ["@tic", "@dir", "addr", "skey", "+who", "news", "sele", "auth", "pers", "usld", "slst", "sviw", "sdta", "~png"];
  socket.on("data", (data) => {
    if (data.length < 4 || !schem.includes(data.toString().substring(0, 4))) {
        socket.destroy();
        return;
    }
    if (data != undefined) {
      const request = new RequestController(data.toString(), socket);
      request.process();
	}
  });

  // Handle client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error("Socket error: " + err.message);
  });
});

const server2 = net.createServer((socket2) => {
    // Handle incoming data
    console.log("Client2 connected");
    const schem = ["@tic", "@dir", "addr", "skey", "+who", "news", "sele", "auth", "pers", "usld", "slst", "sviw", "sdta", "~png"];
    socket2.on("data", (data2) => {
        if (data2.length < 4 || !schem.includes(data2.toString().substring(0, 4))) {
            socket2.destroy();
            return;
        }
        if (data2 != undefined) {
          const request2 = new RequestController(data2.toString(), socket2);
          request2.process();
        }
    });

    // Handle client disconnection
    socket2.on("end", () => {
        console.log("Client2 disconnected");
    });

    // Handle errors
    socket2.on("error", (err) => {
        console.error("Socket error: " + err.message);
    });
});

// Start the server on port 3000
server.listen(10134, () => {
    console.log("Server listening on port " + 10134);
});
server2.listen(serverPort, () => {
    console.log("Server2 listening on port " + serverPort);
});
