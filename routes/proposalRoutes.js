const express = require("express");
const {
  createProposal,
  deleteProposal,
  getAllProposal,
  updateProposalWithEmail,
} = require("../controllers/proposal.controller.js");

const router = express.Router();

router.post("/send", createProposal);
router.delete("/delete/:id", deleteProposal);
router.patch("/req/proposal/update", updateProposalWithEmail);
router.get("/", getAllProposal);

module.exports = router;
