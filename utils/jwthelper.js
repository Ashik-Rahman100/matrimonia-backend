import jwt from 'jsonwebtoken';




const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const jwtHelper = {

  verifyToken,
};

export default jwtHelper
