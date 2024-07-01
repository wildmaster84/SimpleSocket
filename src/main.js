const ServerManager = require("./ServerManager");
const Utils = require("./libraries/Utils");
const utils = new Utils();
class Main {
  constructor() {
    let serverManager = new ServerManager(
      utils.getConfig().server.ip,
      utils.getConfig().server.proxy,
      utils.getConfig().server.port,
      utils.getConfig().server.debug
    );
    serverManager.start();
    if (utils.getConfig().server.debug)
      utils.log("Server in debug mode!", "info");
  }
}

new Main();
module.exports = Main;
