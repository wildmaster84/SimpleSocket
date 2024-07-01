const CommandController = require("./command.controller");

class RequestController {
  constructor(data, socket, ServerManager) {
    this.data = data;
    this.socket = socket;
    this.serverManager = ServerManager;
  }
  process() {
    new CommandController(this.data, this.socket, this.serverManager).process();
  }
}

module.exports = RequestController;
