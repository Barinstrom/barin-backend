const UserModel = require("../../models/user");
const queryUser = async (req, res) => {
   const _user = await UserModel.findById(req.userInfo._id)
      .select("-password -confirmationCode -__v -_id")
      .lean();
   return res.json({ success: true, data: _user });
};
module.exports = queryUser;
