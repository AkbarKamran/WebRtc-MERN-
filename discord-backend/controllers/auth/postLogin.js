const {
  successResponse,
  invalidParameterResponse,
  dbResponse,
  serverResponse,
} = require("../../lib/responseHandler/response.js");
const joi = require("joi");

//Login Router validation

const loginSchema = joi.object({
  password: joi.string().min(8).max(12).required(),
  mail: joi.string().email().required(),
});

const postLogin = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return invalidParameterResponse(
      200,
      "Invalid Parameter",
      error.message,
      res
    );
  }
  return successResponse(200, "Login Route", [], res);
};

module.exports = postLogin;
