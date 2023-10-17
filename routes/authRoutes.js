const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/auth.controller.js");
const { updatePackage } = require("../controllers/packages.controller.js");

router.route("/").get(getAllUsers).put(updatePackage);

/* GET users listing. */
router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", getSingleUsers);
router.get("/getuser/:email", getUserWithEmail);
router.patch("/profile/update/:email", updateUserWithEmail);
router.delete("/delete/user/1/:id", deleteSingleUser);
router.put("/update/user/1/admin/:id", updateToAdmin);
router.put("/update/admin/to/1/user/:id", updateToUser);

module.exports = router;
