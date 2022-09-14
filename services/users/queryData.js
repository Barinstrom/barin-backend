const UserModel = require("../../models/user");
const TeacherModel = require("../../models/teacher");
const AdminModel = require("../../models/admin");
const HostModel = require("../../models/hosts");
const StudentModel = require("../../models/student");
const SchoolModel = require("../../models/school");
const queryUser = async (req, res) => {
   const _user = await UserModel.findById(req.userInfo._id)
      .select("-password -confirmationCode -__v -_id -resetToken")
      .lean();
   const _school = await SchoolModel.findOne({
      schoolID: req.userInfo.schoolID,
   })
      .select("-urlCertificateDocument -paymentDate -_id -schoolID -__v")
      .lean();
   if (_user.role == "host") {
      var data_role = await HostModel.findOne({ userID: req.userInfo._id })
         .select("-__v -_id -userID")
         .lean();
   } else if (_user.role == "admin") {
      var data_role = await AdminModel.findOne({ userID: req.userInfo._id })
         .select("-__v -_id -userID")
         .lean();
   } else if (_user.role == "teacher") {
      var data_role = await TeacherModel.findOne({ userID: req.userInfo._id })
         .select("-__v -_id -userID")
         .lean();
   } else if (_user.role == "student") {
      var data_role = await StudentModel.findOne({ userID: req.userInfo._id })
         .select("-__v -_id -userID")
         .lean();
   }
   return res.json({
      success: true,
      data_user: _user,
      data_role: data_role,
      data_school: _school,
   });
};
module.exports = queryUser;
