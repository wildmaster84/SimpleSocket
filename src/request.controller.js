const querystring = require("querystring");
const CommandController = require("./command.controller");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    const request = this.data.toString();
    const action = request.substring(0, 4);
    new CommandController(action, request, this.socket).process();
  }
}

module.exports = RequestController;
