const Buffer = require("Buffer");
const ConfigManager = require("./ConfigManager");
const configManager = new ConfigManager("./config.yml");
const config = configManager.getConfig();
const crumbsManager = new ConfigManager("./crumbs.yml");
const crumbs = crumbsManager.getConfig();

class Utils {
  constructor() {}
  mergeBytes(...arrays) {
    const buffers = arrays.map((array) => Buffer.from(array));
    return Buffer.concat(buffers);
  }
  getTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedMonth = month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedDateTime = `${year}.${formattedMonth}.${formattedDay}-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDateTime;
  }
  fillString(input, desiredLength, nullChar) {
    // Calculate the number of padding characters needed
    const paddingNeeded = desiredLength - input.length;

    // If the input is already the desired length or longer, return it unchanged
    if (paddingNeeded <= 0) {
      return input;
    }

    // Add the necessary padding characters
    const paddedString = input + nullChar.repeat(paddingNeeded);
    return paddedString;
  }
  PadString(input, key, requiredByteLength, pad) {
    // Convert input string to UTF-8 encoded bytes
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(input);

    // If input already has the required byte length, return it unchanged
    if (byteArray.length === requiredByteLength) {
      return input;
    }

    // Find the "MASK=" substring and extract current mask
    const maskStartIndex = input.indexOf(key) + key.length; // 5 is the length of "MASK="
    const maskEndIndex = input.indexOf("\t", maskStartIndex);
    const currentMask = input.substring(maskStartIndex, maskEndIndex);

    // Calculate current length and padding bytes needed
    const currentLength = byteArray.length;
    const paddingBytesNeeded = requiredByteLength - currentLength;

    // Add padding if necessary
    let adjustedMask = currentMask;
    if (paddingBytesNeeded > 0) {
      adjustedMask += pad.repeat(paddingBytesNeeded);
    }

    // Construct adjusted string with padded mask
    const adjustedString =
      input.substring(0, maskStartIndex) +
      adjustedMask +
      input.substring(maskEndIndex);
    return adjustedString;
  }
  getConfig() {
    return config;
  }

  getCrumbs(category) {
    const categoryConfig = crumbs ? crumbs[category] : null;
    if (!categoryConfig) {
      this.log(`No configuration found for category: ${category}`, "warn");
      return "";
    }

    return Object.entries(categoryConfig)
      .map(
        ([key, value]) =>
          `${key}=${value !== undefined && value !== null ? value : ""}`
      )
      .join("\t");
  }

  log(message, type = "default") {
    switch (type) {
      case "info": {
        if (config.server.debug) console.info(message);
        break;
      }
      case "warn": {
        if (config.server.debug) console.warn(message);
        break;
      }
      case "error": {
        console.error(message);
        break;
      }
      default: {
        console.log(message);
      }
    }
  }
}
module.exports = Utils;
