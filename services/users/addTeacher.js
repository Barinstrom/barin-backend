const teacherModel = require("../../models/teacher");
const userModel = require("../../models/user");
const schoolModel = require("../../models/school");
const { sender } = require("../../utils/mail");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const addTeacher = async (req, res) => {
   const { email, firstname, lastname, tel } = req.body;
   // let clubsID = [];
   // if(!clubs){
   //    clubsID = clubs.map((el) => {
   //       return new mongoose.mongo.ObjectId(el);
   //    });
   // }
   if ((!email, !firstname, !lastname)) {
      res.status(400).send({
         error: "email, firstname, lastname is all required",
      });
   }
   const _user = await userModel.findOne({ email: email }).exec();
   const _school = await schoolModel
      .findOne({ schoolID: req.userInfo.schoolID })
      .exec();
   console.log("_user", _user);
   // if (req.userInfo.role === "admin" && req.userInfo.schoolID !== schoolID) {
   //    return res.status(401).send({ error: "this school is not your school" });
   // }
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
   password = bcrypt.hashSync(password, 10);
   const token = jwt.sign({ email: email }, process.env.SECRET, {
      expiresIn: "7d",
   });

   const new_user = await userModel.create({
      email,
      schoolID: req.userInfo.schoolID,
      role: "teacher",
      password,
      status: "Pending",
      confirmationCode: token,
   });
   await teacherModel.create({
      userID: new_user._id,
      firstname,
      lastname,
      tel,
      // clubs: clubsID,
   });
   sender(new_user.email, new_user.email, new_user.confirmationCode);
   res.send({ success: true });
};

module.exports = addTeacher;
