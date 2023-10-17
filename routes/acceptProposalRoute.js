const express = require("express");
const {
  createAcceptProposal,
  deleteAcceptProposal,
  getAllAcceptProposal,
} = require("../controllers/AcceptProposal.controller");

const router = express.Router();

router.post("/send", createAcceptProposal);
router.delete("/delete/:id", deleteAcceptProposal);
router.get("/", getAllAcceptProposal);

module.exports = router;
