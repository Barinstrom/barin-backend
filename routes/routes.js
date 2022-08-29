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
const { sender } = require("../mail/mail.js");

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;
require("dotenv").config();

router.route("/register").post(async (req, res) => {
  const { userId, password, confirmPassword, email, role, certificate_doc} =
    req.body;

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

  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  console.log(token)
  const data = {
    userId,
    email,
    role,
    password: hashPassword,
    certificate_doc: url_doc,
    status: "Pending",
    confirmationCode:token
  };
  
  const user = new UserModel(data);
  const _user = await user.save();
  sender(data.email, data.userId, data.confirmationCode)
  return res.json({ success: true, data: _user });
});

router.route("/login").post(async (req, res) => {
  const { userId, password } = req.body;
  const _user = await userService.getUserByUsername(userId);
  if (_user) {
    if (bcrypt.compareSync(password, _user.password)) {
      if (req.body.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }
      else {
        const _userInfo = await userService.getUserWithoutPassword(_user._id);
        const token = jwt.sign(_userInfo, process.env.SECRET, {
          expiresIn: "1h",
        });
        return res.json({ success: true, token: token });
      }
    }
  } else if (!userId || !password) {
    return res.status(400).send("Please enter email and password.");
  }
  return res.status(401).send("Email or password is not correct.");
});

module.exports = router;
