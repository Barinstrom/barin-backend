const userModel = require("../../models/user");
const studentModel = require("../../models/student");
const schoolModel = require("../../models/school");
const { sender } = require("../../utils/mail");
const jwt = require("jsonwebtoken");
const addStudent = async (req, res) => {
   const {
      email,
      schoolID,
      firstname,
      lastname,
      enteredYear,
      classYear,
      isActive,
      tel,
   } = req.body;

   if (
      (!email,
      !firstname,
      !lastname,
      !schoolID,
      !enteredYear,
      !classYear,
      !isActive)
   ) {
      res.status(400).send({
         error: "email, firstname, lastname, schoolID is all required",
      });
   }
   const _user = await userModel.findOne({ email }).exec();
   const _school = await schoolModel.findOne({ schoolID }).exec();
   if (req.userInfo.role === "admin" && req.userInfo.schoolID !== schoolID) {
      return res.status(401).send({ error: "this school is not your school" });
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
   const token = jwt.sign({ email: email }, process.env.SECRET, {
      expiresIn: "7d",
   });

   const new_user = await userModel.create({
      email,
      schoolID,
      role: "student",
      password,
      status: "Pending",
      confirmationCode: token,
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
   sender(new_user.email, new_user.email, new_user.confirmationCode);
   return res.json({ success: true, user: new_user, student: new_student });
};

module.exports = addStudent;
