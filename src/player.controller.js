const Buffer = require("Buffer");
const crypto = require("crypto");
const Utils = require("./libraries/Utils");
const utils = new Utils();
let maddrTrail = Buffer.from([
  0xc4, 0xdc, 0xd0, 0xa7, 0xc9, 0xc8, 0x8b, 0xfa, 0x94, 0x99, 0x82, 0x85, 0xa0,
  0x84, 0xd2, 0x8e, 0x86, 0xc5, 0x80, 0x90, 0x82, 0xa9, 0x87, 0xc3, 0xa2, 0x80,
  0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
  0x80, 0x80, 0x80
]);

let maddr;
let addr;
//let params;
let xuid;
let gamertag;

class Player {
  constructor(clientIP) {
    addr = clientIP;
  }

  setMAddr(mac) {
    maddr = mac;
  }
  setGamertag(newGamertag) {
    gamertag = newGamertag;
  }
  setXUID(newXUID) {
    xuid = newXUID;
  }
  getGamertag() {
    return gamertag;
  }
  getMacAddr() {
    return utils.mergeBytes(maddr, "^", maddrTrail);
  }
  getAddr() {
    return addr;
  }
  getXUID() {
    return xuid;
  }
  getUID() {
    return BigInt(
      "0x" +
        crypto.createHash("sha256").update(xuid).digest("hex").slice(0, 16)
    )
      .toString()
      .slice(0, 16);
  }
  getAuthToken() {
    return crypto
      .createHash("sha256")
      .update(xuid + this.getUID())
      .digest("hex")
      .slice(0, 41);
  }
}
module.exports = Player;
