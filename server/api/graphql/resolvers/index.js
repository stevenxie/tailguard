const Time = require("./time");
const { readConfig, writeConfig } = require("../../../config");

const resolvers = {
  Query: {
    meta: () => {
      const { TAILGUARD_VERSION, TAILGUARD_TIMESTAMP } = process.env;
      return {
        version: TAILGUARD_VERSION ?? "dev",
        timestamp: TAILGUARD_TIMESTAMP ?? new Date(),
      };
    },
    rules: async (_, { secret }) => {
      const { auth = {}, rules = [] } = await readConfig();
      if (auth.secret !== secret) throw Error("Secret mismatch.");
      return rules;
    },
  },
  Mutation: {
    updateRules: async (_, { input, secret }, context) => {
      console.log("graphql: updating rules...");

      const { auth } = await readConfig();
      if (auth.secret !== secret) throw Error("Secret mismatch.");

      const { rules } = input;
      const config = { auth, rules };

      // Save new rules and update guardian.
      await writeConfig(config);
      context.guardian.rules = rules;
      return rules;
    },
  },
  Time,
};

module.exports = resolvers;
