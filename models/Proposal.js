const mongoose = require("mongoose");
const model = mongoose.model;
const genSalt = require("bcrypt").genSalt;
const hash = require("bcrypt").hash;
const Schema = mongoose.Schema;
const ProposalSchema = new Schema(
  {
    proposal: {
      type: String,
      required: [true, "Prosal Message is required"],
    },
    senderName: {
      type: String,
      required: [true, "Sender Name is required"],
      lowercase: true,
    },
    receiverEmail: {
      type: String,
      required: [true, "Receiver Email is required"],
      lowercase: true,
    },
    senderId: {
      type: String,
      required: [true, "Sender ID is required"],
      lowercase: true,
    },
    senderEmail: {
      type: String,
      required: [true, "Sender Email is required"],
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["Accept", "Cancel", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

ProposalSchema.pre("save", async function (next) {
  const salt = await genSalt();
  next();
});

const Proposal = model("proposal", ProposalSchema);
module.exports = Proposal;
