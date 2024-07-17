const net = require("net");
const RequestController = require("./request.controller");

// Create a server object
const server = net.createServer((socket) => {
  // Handle incoming data
  socket.on("data", (data) => {
    const request = new RequestController(data, socket);
    request.process();
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
const theater = net.createServer((socket) => {
  // Handle incoming data
  socket.on("data", (data) => {
    const request = new RequestController(data, socket);
    request.process();
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

const msg = net.createServer((socket) => {
  // Handle incoming data
  socket.on("data", (data) => {
    const request = new RequestController(data, socket);
    request.process();
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
theater.listen(10135, () => {
  console.log("Server listening on port 10135");
});

msg.listen(10136, () => {
  console.log("Server listening on port 10136");
});
// Start the server on port 3000
server.listen(10134, () => {
  console.log("Server listening on port 10134");
});
