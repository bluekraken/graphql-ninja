const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User]
    user(_id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(name: String!): User
    deleteUser(_id: ID!): Boolean
  }

  type User {
    _id: ID!
    name: String!
    cars: [Car]
  }
`;
