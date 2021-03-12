const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Connect to the database
connectDB();

// Setup the server
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Middleware
server.applyMiddleware({ app });
app.use(cors());

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
