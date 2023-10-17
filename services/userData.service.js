const UserData = require("../models/UserData.js");

function createUsesrDataService(data) {
  return UserData.create(data);
}

function getAllUsersDataService() {
  return UserData.find({}).select("-password");
}

function getSingleUserDataService(id) {
  return UserData.findOne({
    _id: id,
  }).select("-password");
}

function deleteSingleUserDataService(id) {
  return UserData.deleteOne({
    _id: id,
  });
}

function getUseDatarWithEmailService(email) {
  return UserData.findOne({
    email,
  }).select("-password");
}

function updateUserDataWithEmailService(email, datas) {
  const filter = { email: email };
  const options = { upsert: true };

  return UserData.findOneAndUpdate(
    {
      email,
    },
    datas,
    { new: true }
  ).select("-password");
}

module.exports = {
  createUsesrDataService: createUsesrDataService,
  getAllUsersDataService: getAllUsersDataService,
  getSingleUserDataService: getSingleUserDataService,
  deleteSingleUserDataService: deleteSingleUserDataService,
  getUseDatarWithEmailService: getUseDatarWithEmailService,
  updateUserDataWithEmailService: updateUserDataWithEmailService,
};
