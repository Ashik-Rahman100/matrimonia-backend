const httpResponse = (status, data, message) => {
  let respObj = {
    status,
    data,
    message,
  };
  return respObj;
};

module.exports = httpResponse;
