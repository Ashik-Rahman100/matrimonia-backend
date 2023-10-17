let multer = require("multer");

let stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "userImage") {
      cb(null, "./images/userImage");
    }
  },
  filename: function (req, file, cb) {
    const parts = file.originalname.split(".");
    let extension;
    if (parts.length > 1) {
      extension = "." + parts.pop();
    }

    if (file.fieldname === "userImage") {
      cb(null, file.originalname);
    }
  },
});

let upload = multer({
  storage: stroage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("only png,jpg,jpeg format allowed"), false);
    }
  },
});

exports.upload = upload;
