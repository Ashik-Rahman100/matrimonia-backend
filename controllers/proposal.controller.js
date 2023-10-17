const Proposal = require("../models/Proposal.js");
var proposalService = require("../services/proposal.service.js");
var httpResponse = require("../utils/httpResponse.js");

async function createProposal(req, res) {
  try {
    const newProposal = await proposalService.createProposalService(req.body);

    if (newProposal) {
      res
        .status(200)
        .json(httpResponse("success", newProposal, "Successfully send"));
    } else {
      res.status(201).json(httpResponse("failed", {}, "something went wrong"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(httpResponse("error", {}, err.message));
  }
}

async function deleteProposal(req, res) {
  try {
    const id = req.params.id;

    const proposal = await proposalService.deleteProposalService(id);
    res
      .status(200)
      .json(httpResponse("success", "Successfully Deleted", proposal));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getAllProposal(req, res) {
  try {
    const proposals = await proposalService.getAllProposalService();
    res
      .status(200)
      .json(httpResponse("success", "Successfully find ", proposals));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function updateProposalWithEmail(req, res) {
  // console.log("hitted");
  try {
    const datas = req.body;
    // const email = req.params.email;
    console.log(" body");
    console.log(datas);
    const filter = { _id: datas?._id };
    let options = { new: true };

    console.log(" filter ");

    console.log(filter);

    // const users = await proposalService.updateProposalService(datas);
    const users = await Proposal.findOneAndUpdate(filter, datas, options);
    console.log("users6534");
    console.log(users);
    res.status(200).json(httpResponse("success", "Successfully update", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

module.exports = {
  createProposal: createProposal,
  deleteProposal: deleteProposal,
  getAllProposal: getAllProposal,
  updateProposalWithEmail: updateProposalWithEmail,
};
