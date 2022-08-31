const jwt = require("jsonwebtoken");
const {
  invalidParameterResponse,
  successResponse,
  serverResponse,
} = require("../../lib/responseHandler/response");

const createToken = async (credentials) => {
  const token = await jwt.sign(credentials, process.env.TOKEN_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const verifyToken = async (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return invalidParameterResponse(
      403,
      "A token is require",
      "failed authorization",
      res
    );
  }
  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return serverResponse("Invalid token", res);
  }
  return next();
};
module.exports = { createToken, verifyToken };
