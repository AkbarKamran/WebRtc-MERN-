const User = require("../../models/user");

const findUser = async (mail) => {
  const user = User.findOne({ mail: mail.toLowerCase() });
  return user;
};

module.exports = { findUser };
