let packagesService = require("../services/packages.service.js");
let httpResponse = require("../utils/httpResponse.js");

async function createPackages(req, res) {
  try {
    const newPackages = await packagesService.createPackagesService(req.body);

    if (newPackages) {
      res
        .status(200)
        .json(httpResponse("success", newPackages, "Successfully send"));
    } else {
      res.status(201).json(httpResponse("failed", {}, "something went wrong"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(httpResponse("error", {}, err.message));
  }
}

async function getAllPackages(req, res) {
  try {
    const packages = await packagesService.getAllPackagesService();
    res
      .status(200)
      .json(httpResponse("sucess", "Successfully find ", packages));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function getSinglePackages(req, res) {
  try {
    const id = req.params.id;
    const packages = await packagesService.getSinglePackagesService(Number(id));

    res
      .status(200)
      .json(httpResponse("sucess", packages, "Successfully find "));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
}

async function updatePackageWithId(req, res) {
  try {
    const datas = req.body;
    const id = req.params.id;

    const packages = await packagesService.updatePackageUsingIdService(
      Number(id),
      datas
    );

    res
      .status(200)
      .json(httpResponse("success", packages, "Successfully added"));
  } catch (error) {
    res.status(401).json(httpResponse("fail", {}, error.message));
  }
}

async function updatePackage(req, res) {
  try {
    const datas = req.body;

    const packages = await packagesService.updatePackageService(datas);

    res
      .status(200)
      .json(httpResponse("success", packages, "Successfully added"));
  } catch (error) {
    res.status(401).json(httpResponse("fail", {}, error.message));
  }
}

module.exports = {
  createPackages: createPackages,
  getAllPackages: getAllPackages,
  getSinglePackages: getSinglePackages,
  updatePackageWithId: updatePackageWithId,
  updatePackage: updatePackage,
};
