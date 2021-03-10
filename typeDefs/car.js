const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    cars: [Car]
    car(id: ID!): Car
  }

  extend type Mutation {
    createCar(id: ID!, make: String!, model: String!, colour: String!, ownedBy: ID!): Car!
    deleteCar(id: ID!): Boolean
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    colour: String!
    ownedBy: User!
  }
`;
