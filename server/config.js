const { readFile, writeFile } = require("fs/promises");
const set = require("lodash/set");

const { TAILGUARD_CONFIG } = process.env;
const configPath = TAILGUARD_CONFIG ?? "config.json";

async function readConfig() {
  let config = {};

  try {
    const data = await readFile(configPath, "utf8");
    config = JSON.parse(data);
  } catch (err) {
    if (err?.code !== "ENOENT") throw err;
  }

  if (!config.auth?.secret) {
    const { TWITTER_SECRET } = process.env;
    if (TWITTER_SECRET) set(config, "auth.secret", TWITTER_SECRET);
  }

  return config;
}

async function writeConfig(config) {
  const data = JSON.stringify(config, undefined, "  ");
  return writeFile(configPath, data, "utf8");
}

module.exports = {
  readConfig,
  writeConfig,
};
