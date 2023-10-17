const Packages = require("../models/Packages.js");

function createPackagesService(data) {
  return Packages.create(data);
}

function getAllPackagesService() {
  return Packages.find({});
}

function getSinglePackagesService(name) {
  return Packages.find({ title: name });
}

function updatePackageUsingIdService(id, datas) {
  try {
    const filter = { id: id }; // Assuming 'id' is a valid ObjectId string
    const update = { $push: { condition: datas.condition[0] } };

    const updatedPackage = Packages.findOneAndUpdate(filter, update, {
      new: true, // Return the updated document
    });

    if (!updatedPackage) {
      throw new Error("Package not found");
    }

    return updatedPackage;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function updatePackageService(datas) {
  try {
    const filter = { title: datas.title }; // Assuming 'id' is a valid ObjectId string

    const updatedPackage = Packages.findOneAndUpdate(filter, datas, {
      new: true, // Return the updated document
    });

    if (!updatedPackage) {
      throw new Error("Package not found");
    }

    return updatedPackage;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createPackagesService: createPackagesService,
  getAllPackagesService: getAllPackagesService,
  getSinglePackagesService: getSinglePackagesService,
  updatePackageUsingIdService: updatePackageUsingIdService,
  updatePackageService: updatePackageService,
};
