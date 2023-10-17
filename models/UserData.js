const mongoose = require("mongoose");
const model = mongoose.model;
const genSalt = require("bcrypt").genSalt;
const hash = require("bcrypt").hash;
const Schema = mongoose.Schema;

const userDataSchema = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    photo: {
      type: String,
      required: [true, "photo is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userDataSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

const UserData = model("userData", userDataSchema);

module.exports = UserData;
