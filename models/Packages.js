const mongoose = require("mongoose");
const model = mongoose.model;
const PackageSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    detail: String,
    condition: [
      {
        option: String,
        value: String,
      },
    ],
    // condition: {
    //   type: [String],
    //   required: [true, "Condition is required"],
    // },
  },
  { timestamps: true }
);

const Packages = model("package", PackageSchema);

module.exports = Packages;
