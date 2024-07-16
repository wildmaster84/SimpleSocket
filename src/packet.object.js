const Buffer = require("Buffer");
class Packet {
  constructor(header, packet) {
    return this.create(header, packet);
  }

  create(header, data) {
    let length = data.toString().length + 12;
    console.log(length);
    return mergeBytes(header, Buffer.from([intToHex(length)]), data);
  }
}

function mergeBytes(...arrays) {
  const buffers = arrays.map((array) => Buffer.from(array));
  return Buffer.concat(buffers);
}

function intToHex(num) {
  if (typeof num !== "number") {
    throw new TypeError("Input must be a number");
  }
  // Convert to hexadecimal string and pad with leading zeros if necessary
  const hexString = num.toString(16).padStart(2, "0");
  // Prefix with '0x'
  return `0x${hexString}`;
}
module.exports = Packet;
