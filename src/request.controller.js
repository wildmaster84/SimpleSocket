const Buffer = require("Buffer");

class RequestController {
  constructor(data, socket) {
    this.data = data;
    this.socket = socket;
  }
  process() {
    //console.log("Raw Data (Hex):", this.data.toString("hex"));
    // fsys\x80\x00\x00\x01\x00\x00\x00\xbe
    // fsys\x80\x00\x00\x01\x00\x00\x00\xe7domainPartition.domain=eagames\nmessengerIp=10.10.10.113\nmessengerPort=13505\ndomainPartition.subDomain=NFS-2007\nTXN=Hello\nactivityTimeoutSecs=0\ncurTime="Nov-18-2023 03:58:33 UTC"\ntheaterIp=10.10.10.113\ntheaterPort=18195\x00
    console.log("Data: ", this.data.toString());
    let header = this.data.slice(0, 12);
    let subDomain = this.data.toString().split("clientString=")[1].split("\x0a")[0];

      this.socket.write(mergeBytes(
          // packet header
          header,
          // packet content
          `domainPartition.domain=eagames\n`,
          `messengerIp=10.10.10.113\n`,
          `messengerPort=13505\n`,
          `domainPartition.subDomain=${subDomain}\n`,
          `TXN=Hello\n`,
          `activityTimeoutSecs=0\n`,
          `curTime="Nov-18-2023 03:58:33 UTC"\n`,
          `theaterIp=10.10.10.113\n`,
          `theaterPort=18195\0`
      ));
    //this.socket.end();
  }
}

function mergeBytes(...arrays) {
    const buffers = arrays.map((array) => Buffer.from(array));
    return Buffer.concat(buffers);
}
module.exports = RequestController;
