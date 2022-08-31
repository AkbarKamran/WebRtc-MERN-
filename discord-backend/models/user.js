const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mail: { type: "string", unique: true },
  username: { type: "string" },
  password: { type: "string" },
});

module.exports = mongoose.model("user", userSchema);
