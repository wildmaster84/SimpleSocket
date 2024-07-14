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
    console.log(this.data.toString());
    let header = this.data.slice(0, 12);
    let subDomain = this.data
      .toString()
      .split("clientString=")[1]
      .split("-")[0].toUpperCase();
    let action = this.data.toString().split("TXN=")[1].split("\x0a")[0];
    let packet = this.data.slice(0, 4);
    if (packet == "fsys") {
      if (action == "Hello") {
        this.socket.write(
          mergeBytes(
            // packet header
            `fsys`,
            // source: http://old.zenhax.com/fesl-ea-com-protocol-t1282.html
            Buffer.from([0x80, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0xfe]),
            // packet content
            `domainPartition.domain=eagames\n`,
            `messengerIp=68.46.244.148\n`,
            `messengerPort=10135\n`,
            `domainPartition.subDomain=${subDomain}\n`, // beach-360
            `TXN=Hello\n`,
            `activityTimeoutSecs=0\n`,
            `curTime="Feb-08-2010 17:49:40 UTC"\n`,
            `theaterIp=68.46.244.148\n`,
            `theaterPort=10135\0`
          ),
        );
        
      } else {
        this.socket.write(
          mergeBytes(
            // packet header
            `fsys`,
            Buffer.from([0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3d]),
            `TXN=MemCheck\n`,
            `memcheck.[]=0\n`,
            `type=0\n`,
            `salt=800225952\0`,
          ),
        );
      }
    }
    //this.socket.end();
  }
}

function mergeBytes(...arrays) {
  const buffers = arrays.map((array) => Buffer.from(array));
  return Buffer.concat(buffers);
}
module.exports = RequestController;
