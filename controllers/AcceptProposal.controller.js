const acceptProposalService = require("../services/acceptProposal.service.js");
var httpResponse = require("../utils/httpResponse.js");

async function createAcceptProposal(req, res) {
  try {
    const newProposal = await acceptProposalService.createAcceptProposalService(
      req.body
    );

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

async function deleteAcceptProposal(req, res) {
  try {
    const id = req.params.id;

    const proposal = await acceptProposalService.deleteAcceptProposalService(
      id
    );
    res
      .status(200)
      .json(httpResponse("success", "Successfully Deleted", proposal));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getAllAcceptProposal(req, res) {
  try {
    const proposals = await acceptProposalService.getAllAcceptProposalService();
    res
      .status(200)
      .json(httpResponse("success", "Successfully find ", proposals));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

module.exports = {
  createAcceptProposal: createAcceptProposal,
  deleteAcceptProposal: deleteAcceptProposal,
  getAllAcceptProposal: getAllAcceptProposal,
};
