const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Use default import
const httpResponse = require("../utils/httpResponse.js");
const {
  createUserService,
  deleteSingleUserService,
  getAllUsersService,
  getSingleUsersService,
  getUserWithEmailService,
  updateToAdminService,
  updateToUserService,
  updateUserWithEmailService,
} = require("../services/auth.service.js");
const User = require("../models/User.js");
const { access_secret, refresh_secret } = require("../env.js");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (params, secret, expiresIn = null) => {
  return jwt.sign({ ...params }, secret, {
    expiresIn: expiresIn ?? maxAge,
  });
};

async function signUp(req, res) {
  try {
    const newUser = await createUserService(req.body);
    let tempUser;

    if (newUser) {
      const userJwtData = {
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        id: newUser._id,
      };

      const accessToken = createToken(userJwtData, access_secret, "1d");

      const refreshToken = createToken(userJwtData, refresh_secret, "365d");

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
      delete tempUser.password;

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

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);

      if (auth) {
        const userJwtData = {
          name: user.name,
          role: user.role,
          phone: user.phone,
          email: user.email,
          id: user._id,
        };

        const accessToken = createToken(userJwtData, access_secret, "1d");

        const refreshToken = createToken(userJwtData, refresh_secret, "365d");

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

        let tempUser = { ...user.toJSON() };
        delete tempUser.password;

        res
          .status(200)
          .json(httpResponse("success", tempUser, "Successfully logged in"));
      } else {
        res.status(401).json(httpResponse("failed", {}, "Incorrect password"));
      }
    } else {
      res
        .status(401)
        .json(
          httpResponse(
            "failed",
            {},
            "Employee with this Account does not exist"
          )
        );
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(httpResponse("error", err.message, {}));
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersService();
    res
      .status(200)
      .json(httpResponse("success", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getSingleUsers(req, res) {
  try {
    const id = req.params.id;

    const users = await getSingleUsersService(id);
    res
      .status(200)
      .json(httpResponse("success", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function deleteSingleUser(req, res) {
  try {
    const id = req.params.id;

    const users = await deleteSingleUserService(id);
    res
      .status(200)
      .json(httpResponse("success", "Successfully Deleted", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getUserWithEmail(req, res) {
  try {
    const email = req.params.email;
    const users = await getUserWithEmailService(email);
    res
      .status(200)
      .json(httpResponse("success", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function updateUserWithEmail(req, res) {
  // console.log("hitted");
  try {
    const datas = req.body;
    const email = req.params.email;

    const users = await updateUserWithEmailService(email, datas);
    // console.log(users);
    res
      .status(200)
      .json(httpResponse("success", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function updateToAdmin(req, res) {
  try {
    const id = req.params.id;

    const users = await updateToAdminService(id);
    res.status(200).json(httpResponse("success", "Successfully Added", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function updateToUser(req, res) {
  try {
    const id = req.params.id;

    const users = await updateToUserService(id);
    res.status(200).json(httpResponse("success", "Successfully Added", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    res.clearCookie("refreshToken", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    res.clearCookie("tokenExp", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    res.clearCookie("username", "", {
      path: "/",
    });
    res.clearCookie("userId", "", {
      path: "/",
    });

    res.clearCookie("role", "", {
      path: "/",
    });

    res
      .status(200)
      .json(httpResponse("success", {}, "Successfully logged out."));
  } catch (e) {
    console.log(e);
    res.status(401).json(httpResponse("fail", {}, "Logout Failed"));
  }
}
module.exports = {
  signUp,
  loginUser,
  logoutUser,
  getAllUsers,
  getSingleUsers,
  getUserWithEmail,
  updateUserWithEmail,
  deleteSingleUser,
  updateToAdmin,
  updateToUser,
};
