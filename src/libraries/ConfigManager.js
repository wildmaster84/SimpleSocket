const fs = require("fs");
const yaml = require("js-yaml");
class ConfigManager {
  constructor(configPath) {
    this.configPath = configPath;
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const fileContents = fs.readFileSync(this.configPath, "utf8");
      return yaml.load(fileContents);
    } catch (e) {
      console.error("Failed to load config:", e);
      return null;
    }
  }

  getConfig() {
    return this.config;
  }
}
module.exports = ConfigManager;
