const response = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

export default response;
