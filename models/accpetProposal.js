const mongoose = require("mongoose");
const model = mongoose.model;
const genSalt = require("bcrypt").genSalt;
const Schema = mongoose.Schema;

const AcceptProposalSchema = new Schema(
  {
    acceptBy: {
      type: String,
      required: [true, "Receiver Email is required"],
      lowercase: true,
    },
    requestBy: {
      type: String,
      required: [true, "Sender Email is required"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

AcceptProposalSchema.pre("save", async function (next) {
  const salt = await genSalt();
  next();
});

const AcceptProposal = model("acceptProposal", AcceptProposalSchema);
module.exports = AcceptProposal;
