const AcceptProposal = require("../models/accpetProposal");

function createAcceptProposalService(data) {
  return AcceptProposal.create(data);
}

function deleteAcceptProposalService(id) {
  return AcceptProposal.deleteOne({ _id: id });
}

function getAllAcceptProposalService() {
  return AcceptProposal.find({});
}

module.exports = {
  createAcceptProposalService: createAcceptProposalService,
  deleteAcceptProposalService: deleteAcceptProposalService,
  getAllAcceptProposalService: getAllAcceptProposalService,
};
