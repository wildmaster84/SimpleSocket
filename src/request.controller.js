const CommandController = require("./command.controller");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    new CommandController(this.data, this.socket).process();
  }
}

module.exports = RequestController;
