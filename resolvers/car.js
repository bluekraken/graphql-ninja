const Car = require("../models/Car");
const User = require("../models/User");
const isValidObjectId = require("../utils/isValidObjectId");

const resolvers = {
  Query: {
    cars: async (parent, args) => {
      const cars = await Car.find();
      return cars;
    },
    car: async (parent, { _id }) => {
      const car = isValidObjectId(_id) ? await Car.findById(_id) : null;
      return car;
    }
  },
  Mutation: {
    createCar: async (parent, { make, model, colour, owner }) => {
      const user = isValidObjectId(owner) ? await User.findById(owner) : null;

      const car = user ? await Car.create({ make, model, colour, owner }) : null;

      return car;
    },
    deleteCar: async (parent, { _id }) => {
      const car = isValidObjectId(_id) ? await Car.findById(_id) : false;

      if (car) {
        await car.remove();
      }

      return !!car;
    }
  },
  Car: {
    owner: async (parent, args) => {
      const user = await User.findById(parent.owner);
      return user;
    }
  }
};

module.exports = resolvers;
