const UserModel = require("../../models/user");

const getUserByUsername = async userId => {
  try {
    return await UserModel.findOne()
      .where("email", userId)
      .lean();
  } catch (error) {
    console.log(error);
  }
};

const getUserWithoutPassword = async userId => {
  try {
    return await UserModel.findById(userId)
      .select("-password")
      .lean();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserByUsername,
  getUserWithoutPassword
};