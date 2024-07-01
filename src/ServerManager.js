const net = require("net");
const Utils = require("./libraries/Utils");
const utils = new Utils();
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
      if (this.debug)
        utils.log("Proxy listening on port " + this.proxyPort, "info");
    });
    this.server.listen(this.serverPort, "0.0.0.0", () => {
      if (this.debug)
        utils.log("Server listening on port " + this.serverPort, "info");
    });

    utils.log(
      `OpenParadise(${this.version}): running on ${this.serverIP}:${this.proxyPort}, ${this.serverIP}:${this.serverPort}`
    );
  }

  proxyHandle(socket) {
    // Handle incoming data for proxy server
    utils.log("Proxy client connected", "info");
    const schem = ["@tic", "@dir"];
    socket.on("data", (data) => {
      if (data.length < 4 || !schem.includes(data.toString().substring(0, 4))) {
        socket.destroy();
        return;
      }
      if (data !== undefined) {
        const request = new RequestController(data.toString(), socket);
        request.process();
      }
    });

    // Handle client disconnection
    socket.on("end", () => {
      utils.log("Proxy client disconnected", "info");
    });

    // Handle errors
    socket.on("error", (err) => {
      utils.log("Proxy socket error: " + err.message, "error");
    });
  }

  serverHandle(socket) {
    // Handle incoming data for server
    utils.log("Server client connected", "info");
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
      "cate",
      "snap",
      "gsea"
    ];

    sendHeartbeat(socket, 25, false);
    socket.on("data", (data) => {
      if (data.length < 4 || !schem.includes(data.toString().substring(0, 4))) {
        utils.log(`invalid data ${data.toString()}`, "warn");
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
      utils.log("Server client disconnected", "info");
    });

    // Handle errors
    socket.on("error", (err) => {
      utils.log("Server socket error: " + err.message, "warn");
    });
  }
}
function sendHeartbeat(socket, interval, sync) {
  const intervalMs = interval * 1000; // Convert seconds to milliseconds
  const message = `~png\0\0\0\0\0\0\0#REF=${utils.getTime()}\0`;
  if (!socket.destroyed) {
    if (sync) socket.write(message);
    setTimeout(sendHeartbeat, intervalMs, socket, interval, true);
    utils.log("Sending heartbeat", "info");
  } else {
    utils.log("Socket is destroyed, cannot send heartbeat", "info");
    return; // Exit if the socket is destroyed
  }
}

module.exports = ServerManager;
