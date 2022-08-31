const {
  successResponse,
  invalidParameterResponse,
  dbResponse,
  serverResponse,
} = require("../../lib/responseHandler/response.js");
const { loginSchema } = require("../../lib/validator/auth");
const { findUser } = require("../../services/auth/postLogin");
const { decryptPassword } = require("../../lib/helper/hash");
const { createToken } = require("../../middleware/jwt/token");

const postLogin = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return invalidParameterResponse(
        200,
        "Invalid Parameter",
        error.message,
        res
      );
    }
    const { mail, password } = req.body;

    try {
      const user = await findUser(mail);
      if (user && (await decryptPassword(password, user.password))) {
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
      }
      return successResponse(400, "Invalid Credentials", [], res);
    } catch (error) {
      return dbResponse(error.message, res);
    }
  } catch (error) {
    return serverResponse(error.message, res);
  }
};

module.exports = postLogin;
