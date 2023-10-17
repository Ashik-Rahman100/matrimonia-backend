// const cloudinary = require("cloudinary").v2;
import cloudinary from "cloudinary";
import {
  cloudinary_api_key,
  cloudinary_api_secret,
  cloudinary_cloud_name,
} from "../env";

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
