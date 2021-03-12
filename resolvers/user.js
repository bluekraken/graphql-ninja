const User = require("../models/User");
const Car = require("../models/Car");
const isValidObjectId = require("../utils/isValidObjectId");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (parent, { _id }) => {
      const user = isValidObjectId(_id) ? await User.findById(_id) : null;
      return user;
    }
  },
  Mutation: {
    createUser: async (parent, { name }) => {
      const user = await User.create({ name });
      return user;
    },
    deleteUser: async (parent, { _id }) => {
      const user = isValidObjectId(_id) ? await User.findById(_id) : false;

      if (user) {
        await user.remove();
      }

      return !!user;
    }
  },
  User: {
    cars: async (parent) => {
      const cars = Car.find({ owner: parent._id });
      return cars;
    }
  }
};

module.exports = resolvers;
