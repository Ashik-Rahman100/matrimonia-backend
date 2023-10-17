var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
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
    purchesPackage: {
      status: {
        type: String,
        enum: ["pending", "active"],
        default: "pending",
      },
      title: String,
      price: String,
      detail: String,
      receivedNumber: String,
      transactionId: String,
      purchaseLastTime: Number,
      profileVisted: [
        {
          type: String,
        },
      ],
      condition: [
        {
          option: String,
          value: String,
        },
      ],
    },
    looking: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    mairtalStatus: {
      type: String,
    },
    haveChildren: {
      type: String,
    },
    height: {
      type: Number,
    },
    age: {
      type: Number,
    },
    bodyType: {
      type: String,
    },
    complexion: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    religion: {
      type: String,
    },
    motherTounge: {
      type: String,
    },
    familyValues: {
      type: String,
    },
    fatherOccupation: {
      type: String,
    },
    motherOccupation: {
      type: String,
    },
    brother: {
      type: Number,
    },
    sister: {
      type: Number,
    },
    education: {
      type: String,
    },
    institute: {
      type: String,
    },
    profession: {
      type: String,
    },
    designation: {
      type: String,
    },
    currentCountry: {
      type: String,
    },
    currentCity: {
      type: String,
    },
    currentArea: {
      type: String,
    },
    residentialStatus: {
      type: String,
    },
    homeCountry: {
      type: String,
    },
    district: {
      type: String,
    },
    myself: {
      type: String,
    },
    myfamily: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
