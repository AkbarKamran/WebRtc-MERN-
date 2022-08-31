const {
  successResponse,
  invalidParameterResponse,
  dbResponse,
  serverResponse,
} = require("../../lib/responseHandler/response.js");
const { registerSchema } = require("../../lib/validator/auth");
const { encryptPassword } = require("../../lib/helper/hash");
const { createToken } = require("../../middleware/jwt/token");
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
    let user;
    try {
      // check user Exists with mail parameter
      const userExists = await isUserExist(mail);

      if (userExists) {
        return successResponse(409, "User with email already exists", [], res);
      }

      // encrypt Password
      const encryptedPassword = await encryptPassword(password, 10);

      // create user document and save in database
      user = await saveRegisterInformation(username, encryptedPassword, mail);
    } catch (error) {
      dbResponse(error, res);
    }
    // create JWT token
    const token = await createToken({ userId: user._id, mail });
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
    console.log(error.message);
    return serverResponse(error, res);
  }
};

module.exports = postRegister;
