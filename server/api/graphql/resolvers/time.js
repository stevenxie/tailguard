const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const Time = new GraphQLScalarType({
  name: "Time",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  /** @param {Date} value */
  serialize(value) {
    return value.toISOString(); // value sent to the client
  },
});

module.exports = Time;
