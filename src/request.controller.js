const Buffer = require("Buffer");
const { format } = require("date-fns");
const Packet = require("./packet.object");
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

    let action = this.data.toString().split("TXN=")[1].split("\x0a")[0];
    let packet = this.data.toString().slice(0, 4);
    switch (packet) {
      case "fsys": {
        if (action == "Hello") {
          let subDomain = this.data
            .toString()
            .split("clientString=")[1]
            .split("-")[0]
            .toUpperCase();
          let packet1 = mergeBytes(
            `domainPartition.domain=eagames\x0A`,
            `messengerIp=68.46.244.148\x0A`,
            `messengerPort=10136\x0A`,
            `domainPartition.subDomain=${subDomain}\x0A`, // beach-360
            `TXN=Hello\x0A`,
            `activityTimeoutSecs=0\x0A`,
            `curTime="${this.time()}"\x0A`,
            `theaterIp=68.46.244.148\x0A`,
            `theaterPort=10135\0`
          );
          let packet2 = mergeBytes(
            `TXN=MemCheck\x0a`,
            `memcheck.[]=0\x0a`,
            `type=0\x0a`,
            `salt=yKjM1j4cc\0`
          );
          this.socket.write(
            new Packet(
              mergeBytes(
                // source: http://old.zenhax.com/fesl-ea-com-protocol-t1282.html
                // Note: packet size is controlled by the header which is (header + body) | mister249
                // the header MUST end with the packet size, in our case 230(0xE6)

                //           0x00 = ping packet
                //           0x80 = single packet response
                //           0xb0 = multi packet response
                //           0xc0 = single packet request
                //           0xf0 = multi packet request
                `fsys`,
                Buffer.from([0x80, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00])
              ),
              packet1
            )
          );

          this.socket.write(
            new Packet(
              mergeBytes(
                // packet header
                // 61(0x3D)
                `fsys`,
                Buffer.from([0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
              ),
              packet2
            )
          );
        }

        break;
      }
      case "acct": {
        // Todo: finish acct packet for xbox
        let xuid = this.data.toString().split("xuid=")[1].split("\x0A")[0];
        let packet = mergeBytes(
          `localizedMessage="The TOS Content is out of date."\x0a`,
          `errorContainer.[]=0\x0a`,
          `TXN=NuXBL360Login\x0A`,
          `errorCode=101\0`
        );
        this.socket.write(
          new Packet(
            mergeBytes(
              `acct`,
              Buffer.from([0x80, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00])
            ),
            packet
          )
        );
        break;
      }
    }
    //this.socket.end();
  }
  time() {
    const currentDate = new Date();

    // Format the current date in UTC
    const formattedDate = format(currentDate, "MMM-dd-yyyy HH:mm:ss 'UTC'", {
      timeZone: "UTC"
    });

    return formattedDate;
  }
}

function mergeBytes(...arrays) {
  const buffers = arrays.map((array) => Buffer.from(array));
  return Buffer.concat(buffers);
}

module.exports = RequestController;
