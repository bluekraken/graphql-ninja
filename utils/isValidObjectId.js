const isValidObjectId = (_id) => {
  if (/^[0-9a-fA-F]{24}$/.test(_id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = isValidObjectId;
