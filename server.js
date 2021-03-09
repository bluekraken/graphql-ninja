const express = require("express");
const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
// const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers");

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Connect to the database
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on: ${url}`.yellow.bold);
});
