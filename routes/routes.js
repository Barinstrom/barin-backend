const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const userService = require("../services/users");
const { cloudinary } = require("../utils/cloudinary");
const {sender} = require("../mail")

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;
require("dotenv").config();

router.route("/register").post(async (req, res) => {
  const { userId, password, confirmPassword, email, role, certificate_doc } =
    req.body;

  if (password != confirmPassword)
    return res.status(400).send("Password is not same.");
  if ((!userId, !password, !email, !role))
    return res.status(400).send("Please enter all parameter.");
  if (!validator.isEmail(email))
    return res.status(400).send("Email format is not correct.");

  const hashPassword = bcrypt.hashSync(password, 10);
  const uploadedRes = await cloudinary.uploader.upload(certificate_doc, {
    upload_preset: "certificate_doc",
    public_id: userId,
  });
  const url_doc = uploadedRes.secure_url;
  const data = {
    userId,
    email,
    role,
    password: hashPassword,
    certificate_doc: url_doc,
  };
  const user = new UserModel(data);
  const _user = await user.save();
  sender(user.email, user.userId)
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
