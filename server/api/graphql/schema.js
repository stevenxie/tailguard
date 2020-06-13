const { gql } = require("apollo-server-koa");

const schema = gql`
  type Query {
    meta: MetaInfo!
    rules(secret: String!): [String!]!
  }

  scalar Time

  type MetaInfo {
    version: String!
    timestamp: Time!
  }

  type Mutation {
    updateRules(input: UpdateRulesInput!, secret: String!): [String!]!
  }

  input UpdateRulesInput {
    rules: [String!]!
  }
`;

module.exports = schema;
