const User = require("../../models/user");

const saveRegisterInformation = async (username, password, mail) => {
  const user = await User.create({
    username,
    mail: mail.toLowerCase(),
    password: password,
  });
  return user;
};

const isUserExist = async (mail) => {
  const userExist = await User.exists({ mail: mail.toLowerCase() });
  return userExist;
};

module.exports = { saveRegisterInformation, isUserExist };
