const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

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
