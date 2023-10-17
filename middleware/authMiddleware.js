import httpStatus from "http-status";
import jwtHelper from "../utils/jwthelper.js";
import { refresh_secret } from "../env.js";

const auth =
  (...roles) =>
  async (req, res, next) => {
    try {
      // const token = req.headers.authorization
      const token = req.headers.Authorization;
      console.log(token);
      // console.log(tokens)
      if (!user.role) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ status: "error", message: "You are not authorized" });
      }

      const verifyToken = jwtHelper.verifyToken(token, refresh_secret);
      if (!verifyToken) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ status: "error", message: "Invalid token" });
      }

      req.user = verifyToken;
      // console.log(req.user);
      if (roles.length && !roles.includes(verifyToken.role)) {
        return res.status(httpStatus.FORBIDDEN).json({
          status: "error",
          message: "Authorization failed! Unauthorized user",
        });
      }

      return next();
    } catch (error) {
      const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || "Internal Server Error";
      return res.status(statusCode).json({ status: "error", message });
    }
  };

export default auth;
