const userModel = require("../../models/user");
const studentModel = require("../../models/student");
const schoolModel = require("../../models/school");
const { activate } = require("../../utils/activate");
const jwt = require("jsonwebtoken");
const addStudent = async (req, res) => {
   const {
      email,
      firstname,
      lastname,
      enteredYear,
      classYear,
      isActive,
      tel = "",
   } = req.body;

   if ((!email, !firstname, !lastname, !enteredYear, !classYear, !isActive)) {
      res.status(400).send({
         error: "email, firstname, lastname, enteredYear, classYear, isActive is all required",
      });
   }

   const schoolID = req.userInfo.schoolID;
   const _user = await userModel.findOne({ email }).exec();
   const _school = await schoolModel.findOne({ schoolID }).exec();
   if (req.userInfo.role === "admin" && req.userInfo.schoolID !== schoolID) {
      return res.status(401).send({ error: "This school is not your school." });
   }
   if (_user) {
      return res.status(400).send({ error: "email is already exist" });
   }
   if (!_school) {
      return res.status(400).send({ error: "this school is not exist" });
   }
   const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let password = "";
   for (let i = 0; i < 25; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
   }
   const token = jwt.sign({ email: email }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "7d",
   });

   const new_user = await userModel.create({
      email,
      schoolID,
      role: "student",
      password,
      status: "Pending",
      resetToken: token,
   });
   const new_student = await studentModel.create({
      userID: new_user._id,
      firstname,
      lastname,
      enteredYear,
      classYear,
      isActive,
      reviews: [],
      clubs: [],
      tel,
   });
   // sender(new_user.email, new_user.email, new_user.confirmationCode);
   activate(
      new_user.email,
      new_student.firstname,
      _school.schoolName,
      new_user.schoolID,
      new_user.resetToken
   );
   return res.json({ success: true, user: new_user, student: new_student });
};

module.exports = addStudent;
