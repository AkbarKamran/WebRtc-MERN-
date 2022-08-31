const bcrypt = require("bcryptjs");

const encryptPassword = async (password, salt) => {
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};
module.exports = encryptPassword;
