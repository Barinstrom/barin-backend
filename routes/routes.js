const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const userService = require("../services/users");
const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;
require("dotenv").config();

const validateRegister = (body) => {
  if (!body.userId) throw new Error("Please filled userId ");
  if (!body.password || !body.confirmPassword)
    throw new Error("Please filed password and confirm password");
  if (body.password !== body.confirmPassword)
    throw new Error("Password and confirm password not match !");
  if (!body.email) throw new Error("Please filled email ");
  if (!body.role) throw new Error("Please filled role ");
};

const validateLogin = (body) => {
  if (!body.userId || !body.password)
    throw new Error("Please filled username or password !");
};

router.route("/register").post(async (req, res) => {
  // validateRegister(req.body);
  const { userId, password, email, role } = req.body;
  if (!userId,!password,!email,!role)
    return res.json({ message: "Please enter all parameter."});
  const hashPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
  const data = { userId, email, role, password: hashPassword };
  const user = new UserModel(data);
  const _user = await user.save();
  return res.json({ success: true, data: _user });
});

router.route("/login").post(async (req, res) => {
  // validateLogin(req.body);
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
  }
  else if (!userId || !password){
    return res.json({
      success: false,
      message: "Please enter email and password",
    });
  }
    
  return res.json({
    success: false,
    message: "Username or password is incorrect !",
  });
});

module.exports = router;
