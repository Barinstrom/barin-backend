const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const SchoolModel = require('../models/school');
const AdminModel = require('../models/admin');
const userService = require("../services/users");
const { cloudinary } = require("../utils/cloudinary");

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;
require("dotenv").config();

router.route("/register").post(async (req, res) => {
  const { userId, password,schoolID,schoolName, confirmPassword, email, role, certificate_doc } =
    req.body;
    console.log(req.body);
  // ให้ front เป็น schoolID กับ name ด้วย 
  // schoolID จะเป็น path ที่ใช้ route ในหน้า front ซึ่งจะใช้กับ back ด้วยเพื่อความง่าย

  if (password != confirmPassword)
    return res.status(400).send("Password is not same.");
  if ((!userId, !password, !email, !role)){
    console.log(userId, password, email, role);
    return res.status(400).send("Please enter all parameter.");
  }
  if (!validator.isEmail(email))
    return res.status(400).send("Email format is not correct.");

  const hashPassword = bcrypt.hashSync(password, 10);
  const uploadedRes = await cloudinary.uploader.upload(certificate_doc, {
    upload_preset: "certificate_doc",
    public_id: userId,
  });
  const url_doc = uploadedRes.secure_url;
  // ต้องสร้างโรงเรียนที่มาสมัครใน school_collection ก่อน แล้วค่อยเอา ID เป็น school ของ userdata
  const schoolData = {
    schoolID,
    schoolName,
    urlCertificateDocument: url_doc,
    paymentStatus: 0,
    status: 0, // 0=pending -1=reject 1=approve
    enteredData: new Date(),
    // request , club , schedule urllog bgcolor => null at this point
  }

  // unique field ใน schema ไม่ใช่ validator ต้องเพิ่มเช็คว่าโรงเรียนซ้ำมั้ยด้วยตัวเอง
  // ไว้ค่อยทำ
  const newSchool = new SchoolModel(schoolData);
  newSchool.save();
  const userData = {
    userId,
    password: hashPassword,
    role, // จริงๆน่าจะต้อง fixed ว่าเป็น admin นะ
    school: schoolID,
  };
  const user = new UserModel(userData);
  const _user = await user.save();
  const adminData = {
    _id: _user._id,
    email,
  }
  const admin = new AdminModel(adminData);
  admin.save();
  return res.json({ success: true, data: _user });
});

router.route("/login").post(async (req, res) => {
  const { userId, password } = req.body;
  const _user = await userService.getUserByUsername(userId);
  if (_user) {
    if (bcrypt.compareSync(password, _user.password)) {
      const _userInfo = await userService.getUserWithoutPassword(_user._id);
      const token = jwt.sign(_userInfo, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.json({ success: true, token: token });
    }
  } else if (!userId || !password) {
    return res.status(400).send("Please enter email and password.");
  }
  return res.status(401).send("Email or password is not correct.");
});

module.exports = router;
