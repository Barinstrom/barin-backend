const UserModel = require("../../models/user");

const getUserByUsername = async (userID) => {
   try {
      return await UserModel.findOne().where("email", userID).lean();
   } catch (error) {
      console.log(error);
   }
};

const getUserWithoutPassword = async (userID) => {
   try {
      return await UserModel.findById(userID).select("-password").lean();
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getUserByUsername,
   getUserWithoutPassword,
};
