const net = require("net");
const RequestController = require("./request.controller");

// Create a server object
const server = net.createServer((socket) => {
  console.log("Client connected");
    const ackInterval = setInterval(() => {
      socket.write('ACK');
      console.log('Sent: ACK');
    }, 5000);
  // Handle incoming data
  socket.on("data", (data) => {
    const request = new RequestController(data, socket);
    request.process();
  });

  // Handle client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
    clearInterval(ackInterval);
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error("Socket error: " + err.message);
    clearInterval(ackInterval);
  });
});

// Start the server on port 3000
server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
