const querystring = require("querystring");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    console.log("Raw Data (Hex):", this.data.toString("hex"));

    const request = this.data.toString();
    // Split request into headers and body
    const [headerPart, bodyPart] = request.split("\r\n\r\n");
    const headers = headerPart
      .split("\r\n")
      .slice(1)
      .reduce((acc, line) => {
        const [key, value] = line.split(": ");
        acc[key.toLowerCase()] = value;
        return acc;
      }, {});

    console.log("Headers:", headers);

    // Parse the URL-encoded body
    const contentType = headers["content-type"];
    const body = querystring.parse(bodyPart);
    console.log("Parsed Body:", body);

    // Switch between data type
    switch (contentType?.split(";")[0]) {
      case "application/x-www-form-urlencoded": {
        this.socket.write("<xml></xml>");
        break;
      }
      case "application/json": {
        this.socket.write("{}");
        break;
      }
      default: {
        console.log("Unsupported content type:", contentType);
        this.socket.write("");
        break;
      }
    }
    this.socket.end();
  }
}

module.exports = RequestController;
