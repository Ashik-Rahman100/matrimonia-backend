var User = require("../models/User.js");

function createUserService(data) {
  return User.create(data);
}

function getAllUsersService() {
  return User.find({}).select("-password");
}

function getSingleUsersService(id) {
  return User.findOne({
    _id: id,
  }).select("-password");
}

function deleteSingleUserService(id) {
  return User.deleteOne({
    _id: id,
  });
}

function getUserWithEmailService(email) {
  return User.findOne({
    email,
  }).select("-password");
}

function updateUserWithEmailService(email, datas) {
  var filter = { email: email };
  var options = { upsert: true };

  return User.findOneAndUpdate(
    {
      email,
    },
    datas,
    { new: true }
  ).select("-password");
}

function updateToAdminService(id, datas) {
  var filter = { _id: id };
  var options = { upsert: true };
  var updatedDoc = {
    $set: {
      role: "admin",
    },
  };

  return User.findOneAndUpdate(filter, updatedDoc, options).select("-password");
}

function updateToUserService(id, datas) {
  var filter = { _id: id };
  var options = { upsert: true };
  var updatedDoc = {
    $set: {
      role: "user",
    },
  };

  return User.findOneAndUpdate(filter, updatedDoc, options).select("-password");
}

function updateUserPackageService(id, datas) {
  var filter = { _id: id };
  var options = { upsert: true };
  var updatedDoc = {
    $set: {
      role: "admin",
    },
  };

  return User.findOneAndUpdate(filter, updatedDoc, options).select("-password");
}

module.exports = {
  createUserService: createUserService,
  getAllUsersService: getAllUsersService,
  getSingleUsersService: getSingleUsersService,
  deleteSingleUserService: deleteSingleUserService,
  getUserWithEmailService: getUserWithEmailService,
  updateUserWithEmailService: updateUserWithEmailService,
  updateToAdminService: updateToAdminService,
  updateToUserService: updateToUserService,
  updateUserPackageService: updateUserPackageService,
};
