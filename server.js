const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const users = require("./data/users");
const cars = require("./data/cars");
const me = users[0];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    cars: [Car]
    car(id: ID!): Car
  }

  type User {
    id: ID!
    name: String!
  }

  type Car {
    make: String!
    model: String!
    colour: String!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.find((user) => user.id === id),
    me: () => me,
    cars: () => cars,
    car: (parent, { id }) => cars.find((car) => car.id === id)
  }
};

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Connect to the database
connectDB();

// Start the server
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
