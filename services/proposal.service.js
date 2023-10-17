const Proposal = require("../models/Proposal.js");

function createProposalService(data) {
  return Proposal.create(data);
}

function deleteProposalService(id) {
  return Proposal.deleteOne({ _id: id });
}

function getAllProposalService() {
  return Proposal.find();
}

function updateProposalService(datas) {
  var options = { upsert: true };
  const filter = { _id: datas._id };

  console.log("datas123");
  console.log(filter);
  console.log(datas);
  return Proposal.findOneAndUpdate(filter, datas, options);
}

module.exports = {
  createProposalService: createProposalService,
  deleteProposalService: deleteProposalService,
  getAllProposalService: getAllProposalService,
  updateProposalService: updateProposalService,
};
