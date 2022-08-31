const bcrypt = require("bcryptjs");

const encryptPassword = async (password, salt) => {
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};
const decryptPassword = async (password, dbPassword) => {
  const valid = await bcrypt.compare(password, dbPassword);
  return valid;
};
module.exports = { encryptPassword, decryptPassword };
