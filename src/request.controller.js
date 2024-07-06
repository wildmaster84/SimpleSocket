const Buffer = require("Buffer");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    //console.log("Raw Data (Hex):", this.data.toString("hex"));
    console.log("Data: ", this.data.toString());
      //this.socket.write(mergeBytes("fsys", Buffer.from([0xc0]), "\0\0\x01\0\0\0", Buffer.from([0xbb]), "TXN=Hello\0"));
    //this.socket.end();
  }
}

function mergeBytes(...arrays) {
    const buffers = arrays.map((array) => Buffer.from(array));
    return Buffer.concat(buffers);
}
module.exports = RequestController;
