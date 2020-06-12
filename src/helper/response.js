module.exports = (response, status, result) =>
  response.status(status).json({
    status,
    data: result
  });
