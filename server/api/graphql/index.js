const { ApolloServer } = require("apollo-server-koa");

const schema = require("./schema");
const resolvers = require("./resolvers");

const { readConfig, writeConfig } = require("../../config");
const Guardian = require("../../guardian");

async function createServer() {
  const { rules } = await readConfig();
  const guardian = new Guardian({ rules });

  return new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      config: {
        read: readConfig,
        write: writeConfig,
      },
      guardian,
    },
    playground: {
      endpoint: "/api/graphql",
      settings: {
        "editor.theme": "dark",
      },
    },
    introspection: true,
  });
}

module.exports = { createServer, schema, resolvers };
