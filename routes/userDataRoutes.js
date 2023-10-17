const express = require("express");
const {
  createUser,
  deleteSingleUserData,
  getAllUsersData,
  getSingleUserData,
  getUserDataWithEmail,
  updateUserDataWithEmail,
} = require("../controllers/userData.controller.js");
const router = express.Router();

/* GET users listing. */
router.post("/create", createUser);
router.get("/", getAllUsersData);
router.get("/:id", getSingleUserData);
router.get("/getuser/:email", getUserDataWithEmail);
router.patch("/profile/update/:email", updateUserDataWithEmail);
router.delete("/delete/user/1/:id", deleteSingleUserData);

module.exports = router;
