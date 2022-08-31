const successResponse = (statusCode, msg, data, res) => {
  res.status(statusCode).json({
    status: statusCode,
    message: msg,
    data: data,
  });
};

const invalidParameterResponse = (statusCode, msg, err, res) => {
  res.status(statusCode).json({
    status: statusCode,
    message: msg,
    err: err,
    data: [],
  });
};

const dbResponse = (err, res) => {
  res.status(502).json({
    status: 502,
    message: "Database Error",
    err: err,
    data: [],
  });
};

const serverResponse = (err, res) => {
  res.status(400).json({
    status: 400,
    message: "Server Error",
    err: err,
    data: [],
  });
};

module.exports = {
  successResponse,
  invalidParameterResponse,
  dbResponse,
  serverResponse,
};
