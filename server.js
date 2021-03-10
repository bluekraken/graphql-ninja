const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
let users = require("./data/users");
let cars = require("./data/cars");
const me = users[0];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    cars: [Car]
    car(id: ID!): Car
  }

  type Mutation {
    createUser(id: ID!, name: String!): User!
    deleteUser(id: ID!): Boolean
    createCar(id: ID!, make: String!, model: String!, colour: String!, ownedBy: ID!): Car!
    deleteCar(id: ID!): Boolean
  }

  type User {
    id: ID!
    name: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    colour: String!
    ownedBy: User!
  }
`;

// const resolvers = {
//   Query: {
//     users: () => users,
//     user: (parent, { id }) => users.find((user) => user.id === id),
//     me: () => me,
//     cars: () => cars,
//     car: (parent, { id }) => cars.find((car) => car.id === id)
//   },
//   Car: {
//     ownedBy: (parent) => users.find((user) => user.id === parent.ownedBy)
//   },
//   User: {
//     cars: (parent) => {
//       return parent.cars ? cars.filter((car) => parent.cars.includes(car.id)) : undefined;
//     }
//   }
// };

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => users.find((user) => user.id === id),
    me: () => me,
    cars: () => cars,
    car: (parent, { id }) => cars.find((car) => car.id === id)
  },
  Mutation: {
    createUser: (parent, { id, name }) => {
      const user = {
        id,
        name
      };
      users.push(user);
      return user;
    },
    deleteUser: (parent, { id }) => {
      let found = false;
      users = users.filter((user) => {
        if (user.id === id) {
          found = true;
        } else {
          return true;
        }
      });
      return found;
    },
    createCar: (parent, { id, make, model, colour, ownedBy }) => {
      const car = {
        id,
        make,
        model,
        colour,
        ownedBy
      };
      cars.push(car);
      return car;
    },
    deleteCar: (parent, { id }) => {
      let found = false;
      cars = cars.filter((car) => {
        if (car.id === id) {
          found = true;
        } else {
          return true;
        }
      });
      return found;
    }
  },
  Car: {
    ownedBy: (parent) => users.find((user) => user.id === parent.ownedBy)
  },
  User: {
    cars: (parent) => cars.filter((car) => car.ownedBy === parent.id)
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
