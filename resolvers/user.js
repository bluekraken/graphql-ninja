const resolvers = {
  Query: {
    users: (parent, args, { users }) => users,
    user: (parent, { id }, { users }) => users.find((user) => user.id === id),
    me: (parent, args, { users }) => users[0]
  },
  Mutation: {
    createUser: (parent, { id, name }, { users }) => {
      const user = {
        id,
        name
      };
      users.push(user);
      return user;
    },
    deleteUser: (parent, { id }, { users }) => {
      let found = false;
      users = users.filter((user) => {
        if (user.id === id) {
          found = true;
        } else {
          return true;
        }
      });
      return found;
    }
  },
  User: {
    cars: (parent, args, { cars }) => cars.filter((car) => car.ownedBy === parent.id)
  }
};

module.exports = resolvers;
