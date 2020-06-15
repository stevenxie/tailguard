const Twit = require("twit");
const isEmpty = require("lodash/isEmpty");
const requireFromString = require("require-from-string");

const { EventEmitter } = require("events");

// Read auth variables.
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;
if (!TWITTER_CONSUMER_KEY) throw Error("Missing Twitter consumer key.");
if (!TWITTER_CONSUMER_SECRET) throw Error("Missing Twitter secret key.");

class Guardian extends EventEmitter {
  /** @type {Twit} */
  client;

  /** @type {string[]} */
  rules;

  constructor({ token, secret, rules }) {
    super();

    this.rules = rules ?? [];
    const { TWITTER_TOKEN, TWITTER_SECRET } = process.env;

    this.client = new Twit({
      access_token: token ?? TWITTER_TOKEN,
      access_token_secret: secret ?? TWITTER_SECRET,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
    });

    const { TAILGUARD_POLL_INTERVAL } = process.env;
    this.check();
    setInterval(this.check, TAILGUARD_POLL_INTERVAL ?? 60000);
  }

  cache = null;
  check = () => {
    console.log("guardian: checking for followers...");

    this.client.get("followers/list", { count: 200 }, (err, { users }) => {
      if (err) {
        console.error(`guardian: failed to list followers: ${err}`);
        return;
      }

      this.cache = users.reduce((cache, user) => {
        const { id } = user;
        cache[id] = user;
        if (this.cache && !(id in this.cache)) this.handleFollower(user);
        return cache;
      }, {});
    });
  };

  prune = async (user) => {
    this.emit("prune", user);

    const { screen_name } = user;
    console.log(`guardian: pruning @${screen_name}...`);

    try {
      await this.client.post("blocks/create", {
        screen_name,
        include_entities: false,
      });
      await sleep(250);
      await this.client.post("blocks/destroy", {
        screen_name,
        include_entities: false,
      });
    } catch (err) {
      // this.emit("error", err);
      console.error(`guardian: failed to prune @${screen_name}: ${err}`);
    }
  };

  handleFollower = async (user) => {
    this.emit("follower", user);

    const { rules } = this;
    if (isEmpty(rules)) return;

    // Go through all rules, and run them on user. If any rules return truthy,
    // return early.
    //
    // If all rules are falsy, prune the user.
    for (let i = 0; i < rules.length; i++) {
      const rule = requireFromString(rules[i]);
      const result = rule(user, this.client);
      const passed = result instanceof Promise ? await result : result;
      if (passed) {
        this.emit("allow", user);
        return;
      }
    }

    this.prune(user);
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = Guardian;
