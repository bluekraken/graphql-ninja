const resolvers = {
  Query: {
    cars: (parent, args, { cars }) => cars,
    car: (parent, { id }, { cars }) => cars.find((car) => car.id === id)
  },
  Mutation: {
    createCar: (parent, { id, make, model, colour, ownedBy }, { cars }) => {
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
    deleteCar: (parent, { id }, { cars }) => {
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
    ownedBy: (parent, args, { users }) => users.find((user) => user.id === parent.ownedBy)
  }
};

module.exports = resolvers;
