let jwt = require("jsonwebtoken");
let httpResponse = require("../utils/httpResponse.js");
let userDataService = require("../services/userData.service.js");
const { access_secret, refresh_secret } = require("../env.js");

let maxAge = 3 * 24 * 60 * 60;

function createToken(params, secret, expiresIn) {
  expiresIn = expiresIn || null;
  return jwt.sign({ ...params }, secret, {
    expiresIn: expiresIn || maxAge,
  });
}

async function createUser(req, res) {
  try {
    let newUser = await userDataService.createUsesrDataService(req.body);
    let tempUser;

    if (newUser) {
      let userJwtData = {
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        id: newUser._id,
      };

      let accessToken = createToken(userJwtData, access_secret, "1d");

      let refreshToken = createToken(userJwtData, refresh_secret, "365d");

      res.cookie("tokenExp", "1", {
        sameSite: "strict",
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      });

      res.cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
      });

      tempUser = { ...newUser.toJSON() };

      res
        .status(200)
        .json(httpResponse("success", tempUser, "Successfully sign up"));
    } else {
      res.status(201).json(httpResponse("failed", {}, "something went wrong"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(httpResponse("error", {}, err.message));
  }
}

async function getAllUsersData(req, res) {
  try {
    let users = await userDataService.getAllUsersDataService();
    res.status(200).json(httpResponse("sucess", "Successfully find", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getSingleUserData(req, res) {
  try {
    let id = req.params.id;
    let users = await userDataService.getSingleUserDataService(id);
    res.status(200).json(httpResponse("sucess", "Successfully find", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function deleteSingleUserData(req, res) {
  try {
    let id = req.params.id;
    let users = await userDataService.deleteSingleUserDataService(id);
    res.status(200).json(httpResponse("sucess", "Successfully Deleted", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getUserDataWithEmail(req, res) {
  try {
    let email = req.params.email;
    let users = await userDataService.getUseDatarWithEmailService(email);
    res
      .status(200)
      .json(httpResponse("sucess", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function updateUserDataWithEmail(req, res) {
  try {
    let datas = req.body;
    let email = req.params.email;
    let users = await userDataService.updateUserDataWithEmailService(
      email,
      datas
    );
    res
      .status(200)
      .json(httpResponse("sucess", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

module.exports = {
  createUser: createUser,
  getAllUsersData: getAllUsersData,
  getSingleUserData: getSingleUserData,
  deleteSingleUserData: deleteSingleUserData,
  getUserDataWithEmail: getUserDataWithEmail,
  updateUserDataWithEmail: updateUserDataWithEmail,
};
