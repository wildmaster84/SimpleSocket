const net = require("net");
const RequestController = require("./request.controller");

class ServerManager {
  constructor(serverIP, proxyPort, serverPort, debug) {
    this.serverIP = serverIP;
    this.proxyPort = proxyPort;
    this.serverPort = serverPort;
    this.debug = debug;
    this.version = "v1.0.0";

    // Initialize servers
    this.proxyServer = net.createServer(this.proxyHandle.bind(this));
    this.server = net.createServer(this.serverHandle.bind(this));
  }

  start() {
    // Start both servers
    this.proxyServer.listen(this.proxyPort, "0.0.0.0", () => {
      if (this.debug) console.log("Proxy listening on port " + this.proxyPort);
    });
    this.server.listen(this.serverPort, "0.0.0.0", () => {
      if (this.debug)
        console.log("Server listening on port " + this.serverPort);
    });

    console.log(
      `BurnoutParadise(${this.version}): running on ${this.serverIP}:${this.proxyPort}, ${this.serverIP}:${this.serverPort}`
    );
  }

  proxyHandle(socket) {
    // Handle incoming data for proxy server
    console.log("Proxy client connected");
    const schem = ["@tic", "@dir"];
    socket.on("data", (data) => {
      if (data.length < 4 || !schem.includes(data.toString().substring(0, 4))) {
        socket.destroy();
        return;
      }
      if (data !== undefined) {
        const request = new RequestController(data.toString(), socket, this);
        request.process();
      }
    });

    // Handle client disconnection
    socket.on("end", () => {
      console.log("Proxy client disconnected");
    });

    // Handle errors
    socket.on("error", (err) => {
      console.error("Proxy socket error: " + err.message);
    });
  }

  serverHandle(socket) {
    // Handle incoming data for server
    console.log("Server client connected");
    const schem = [
      "addr",
      "skey",
      "~png",
      "sele",
      "auth",
      "pers",
      "news",
      "usld",
      "slst",
      "sviw",
      "sdta",
      "gpsc",
      "hchk",
      "gset",
      "rent",
      "rrlc",
      "rrgt",
      "gdel",
      "fbst",
      "opup",
      "rrup",
      "gqwk",
      "cate"
    ];

    sendHeartbeat(socket, 25, false);
    socket.on("data", (data) => {
      if (data.length < 4 || !schem.includes(data.toString().substring(0, 4))) {
        console.log(`invalid data ${data.toString()}`);
        socket.destroy();
        return;
      }
      if (data !== undefined) {
        const request = new RequestController(data.toString(), socket, this);
        request.process();
      }
    });

    // Handle client disconnection
    socket.on("end", () => {
      console.log("Server client disconnected");
    });

    // Handle errors
    socket.on("error", (err) => {
      console.error("Server socket error: " + err.message);
    });
  }
}
function sendHeartbeat(socket, interval, sync) {
  const intervalMs = interval * 1000; // Convert seconds to milliseconds
  const message = `~png\0\0\0\0\0\0\0#REF=${getTime()}\0`;
  if (!socket.destroyed) {
    if (sync) socket.write(message);
    setTimeout(sendHeartbeat, intervalMs, socket, interval, true);
    console.log("[i] Sending heartbeat");
  } else {
    console.log("[i] Socket is destroyed, cannot send message");
    return; // Exit if the socket is destroyed
  }
}
function getTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero indexed, so January is 0
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Pad single digit values with leading zeros
  const formattedMonth = month; // < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Construct the formatted date-time string
  const formattedDateTime = `${year}.${formattedMonth}.${formattedDay}-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedDateTime;
}

// Initialize the ServerManager with your configuration
const serverManager = new ServerManager(
  "68.46.244.148".toString(),
  10134,
  10135,
  true
);

// Start the servers
serverManager.start();

module.exports = serverManager;
