const querystring = require("querystring");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    //console.log("Raw Data (Hex):", this.data.toString("hex"));
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

    //console.log("Headers:", headers);

    // Parse the URL-encoded body
    const contentType = headers["content-type"];
    const body = querystring.parse(bodyPart);
    //console.log("Parsed Body:", body);

    // Switch between data type
    switch (contentType?.split(";")[0]) {
      default: {
        //console.log("Unsupported content type:", contentType);
        console.log("Data", request);
            
            if (request.split("/")[1] == null) {
                // When xenia first tests the connection.
                this.socket.write("HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 2\r\n\r\n{}");
                this.socket.end();
            } else {
                // When xenia makes a put method to upload files.
                this.socket.write("HTTP/1.1 201 CREATED");
                this.socket.end();
            }
        break;
      }
    }
    //this.socket.end();
  }
}

module.exports = RequestController;
