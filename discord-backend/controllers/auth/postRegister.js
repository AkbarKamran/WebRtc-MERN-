const {
  successResponse,
  invalidParameterResponse,
  dbResponse,
  serverResponse,
} = require("../../lib/responseHandler/response.js");
const joi = require("joi");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
// Register Router Schema
const registerSchema = joi.object({
  username: joi.string().min(3).max(16).required(),
  password: joi.string().min(8).max(12).required(),
  mail: joi.string().email().required(),
});

// Register Router Post Request
const postRegister = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return invalidParameterResponse(
        200,
        "Invalid Parameter",
        error.message,
        res
      );
    }
    const { username, password, mail } = req.body;
    // check user Exists with mail parameter
    const userExists = await User.exists({ mail: mail.toLowerCase() });
    if (userExists) {
      return successResponse(409, "User with email already exists", [], res);
    }
    // encrypt Password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // create user document and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // create JWT token
    const token = "JWT TOKEN";
    return successResponse(
      201,
      "Register Route",
      {
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
        },
      },
      res
    );
  } catch (error) {
    return serverResponse(error, res);
  }
};

module.exports = postRegister;
