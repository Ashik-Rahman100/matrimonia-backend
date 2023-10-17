const express = require("express");
const path = require("path");
const { upload } = require("../models/multer.js");
const multerImageController = require("../controllers/multerImage.controller.js");
const router = express.Router();

router.post(
  "/upload",
  upload.fields([{ name: "userImage", maxCount: 1 }]),
  multerImageController.postMedia
);

module.exports = router;
