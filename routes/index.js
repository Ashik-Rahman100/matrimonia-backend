const express = require("express");

const router = express.Router();
const authRoutes = require("./authRoutes.js");
const multerRoutes = require("./multerRoute.js");
const userData = require("./userDataRoutes.js");
const proposalRoutes = require("./proposalRoutes.js");
const acceptProposalRoutes = require("./acceptProposalRoute.js");
const packagesRoutes = require("./packageRoutes.js");

let rootRouter = router;

rootRouter.use("/user", authRoutes);
rootRouter.use("/img", multerRoutes);
rootRouter.use("/userData", userData);
rootRouter.use("/proposal", proposalRoutes);
rootRouter.use("/accept-proposal", acceptProposalRoutes);
rootRouter.use("/package", packagesRoutes);
module.exports = rootRouter;
