const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    cars: [Car]
    car(_id: ID!): Car
  }

  extend type Mutation {
    createCar(make: String!, model: String!, colour: String!, owner: ID!): Car
    deleteCar(_id: ID!): Boolean
  }

  type Car {
    _id: ID!
    make: String!
    model: String!
    colour: String!
    owner: User!
  }
`;
