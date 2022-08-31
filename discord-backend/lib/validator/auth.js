const joi = require("joi");
const registerSchema = joi.object({
  username: joi.string().min(3).max(16).required(),
  password: joi.string().min(8).max(12).required(),
  mail: joi.string().email().required(),
});
const loginSchema = joi.object({
  password: joi.string().min(8).max(12).required(),
  mail: joi.string().email().required(),
});

module.exports = { registerSchema, loginSchema };
