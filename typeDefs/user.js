const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(id: ID!, name: String!): User!
    deleteUser(id: ID!): Boolean
  }

  type User {
    id: ID!
    name: String!
    cars: [Car]
  }
`;
