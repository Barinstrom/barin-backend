const School = require("../../models/school");
const User = require("../../models/user");
const querySchool = async (req, res) => {
   const _user = await User.findById(req.userInfo._id)
      .select("-password -confirmationCode -__v -_id")
      .lean();
   const school = await School.findOne({ schoolID: _user.schoolID }).select(
      "-urlCertificateDocument -paymentDate -_id"
   );
   return res.json({ success: true, data: school });
};
module.exports = querySchool;
