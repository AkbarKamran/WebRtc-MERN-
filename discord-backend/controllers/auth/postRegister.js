const {
  successResponse,
  invalidParameterResponse,
  dbResponse,
  serverResponse,
} = require("../../lib/responseHandler/response.js");
const registerSchema = require("../../lib/validator/postRegister");
const User = require("../../models/user");
const encryption = require("../../lib/helper/hash");
const {
  saveRegisterInformation,
  isUserExist,
} = require("../../services/auth/postRegister");

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

    try {
      // check user Exists with mail parameter
      const userExists = await isUserExist(mail);
      if (userExists) {
        return successResponse(409, "User with email already exists", [], res);
      }

      // encrypt Password
      const encryptedPassword = await encryption(password, 10);

      // create user document and save in database
      const user = await saveRegisterInformation(
        username,
        encryptedPassword,
        mail
      );
    } catch (error) {
      dbResponse(error, res);
    }
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
