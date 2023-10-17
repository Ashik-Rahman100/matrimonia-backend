const express = require("express");
const {
  createPackages,
  getAllPackages,

  updatePackageWithId,
  updatePackage,
  getSinglePackages,
} = require("../controllers/packages.controller.js");

const router = express.Router();

router.route("/").get(getAllPackages).patch(updatePackage);

router.route("/:name").get(getSinglePackages);

router.post("/newPackage", createPackages);
router.patch("/update/:name", updatePackageWithId);
router.get("/:id", getSinglePackages);

module.exports = router;
