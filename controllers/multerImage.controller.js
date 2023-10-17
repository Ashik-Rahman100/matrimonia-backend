const httpStatus = require("http-status");
const httpResponse = require("../utils/httpResponse.js");
const mediaServices = require("../services/media.service.js");

async function postMedia(req, res) {
  try {
    let userImage;
    // console.log("Image", req?.files);
    if (req?.files) {
      userImage = `http://localhost:5000/api/v1/images/userImage/${req?.files?.userImage[0]?.filename}`;
    }

    const result = await mediaServices.postMedia({ userImage });
    res
      .status(201)
      .json(httpResponse("success", result, "media posted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

async function getAllfromMedia(req, res) {
  try {
    const result = await mediaServices.getAllMedia();
    res
      .status(200)
      .json(httpResponse("success", result, "media  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

async function deleteFromMedia(req, res) {
  try {
    const result = await mediaServices.deleteMedia(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "media  deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

let multerImageController = {
  postMedia,
  getAllfromMedia,
  deleteFromMedia,
};

module.exports = multerImageController;
