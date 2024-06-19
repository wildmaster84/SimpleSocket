const querystring = require("querystring");
const CommandController = require("./command.controller");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    const action = this.data.substring(0, 4);
    new CommandController(action, this.data, this.socket).process();
  }
}

module.exports = RequestController;
