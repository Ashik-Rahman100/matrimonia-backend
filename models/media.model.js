let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    userImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("media", mediaSchema);

module.exports = Media;
