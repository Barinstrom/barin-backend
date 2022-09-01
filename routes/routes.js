const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const SchoolModel = require("../models/school");
const AdminModel = require("../models/admin");
const userService = require("../services/users");
const { cloudinary } = require("../utils/cloudinary");
const { sender } = require("../utils/mail");
const verifyUser = require("../middleware/verifyUser");

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;
require("dotenv").config();

router.route("/register").post(async (req, res) => {
  const { email, password, confirmPassword,schoolID,schoolName, role, certificate_doc } =
    req.body;

  if (password != confirmPassword)
    return res.status(400).send("Password is not same.");
  if ((!email, !password, !email, !role, !schoolID)) {
    console.log(email, password, email, role);
    return res.status(400).send("Please enter all parameter.");
  }
  if (!validator.isEmail(email))
    return res.status(400).send("Email format is not correct.");

  const hashPassword = bcrypt.hashSync(password, 10);
  const uploadedRes = await cloudinary.uploader.upload(certificate_doc, {
    upload_preset: "certificate_doc",
    public_id: email,
  });
  const url_doc = uploadedRes.secure_url;

  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  console.log(token);
  const school = await SchoolModel.findOne({schoolID}).exec();
  const schoolByName = await SchoolModel.findOne({schoolName}).exec();
  const checkuser = await UserModel.findOne({email}).exec();
  //console.log(school,schoolByName)
  if(!school && !schoolByName && !checkuser){
    const schoolData = {
      schoolID,
      schoolName,
      urlCertificateDocument: url_doc,
      paymentStatus: 'pending',
      status: 'pending', // 0=pending -1=reject 1=approve
      enteredData: new Date(),
      // request , club , schedule urllog bgcolor => null at this point
    }
    new_school = await SchoolModel.create(schoolData);

    const data = {
      email,
      role,
      school: schoolID,
      password: hashPassword,
      status: "Pending",
      confirmationCode: token,
    };
    
    const user = new UserModel(data);
    const _user = await user.save();
    await AdminModel.create({userId:_user._id});
    sender(data.email, data.email, data.confirmationCode);
    return res.json({ success: true, data: _user });
  }
  else if(!school){
    return res.status(400).send("SchoolID is already exist.");
  }
  else if(!schoolByName){
    return res.status(400).send("Your school is already registered.");
  }
  else{
    return res.status(400).send("user already exist");
  }

});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  const _user = await userService.getUserByUsername(email);
  if (_user) {
    if (bcrypt.compareSync(password, _user.password)) {
      const _userInfo = await userService.getUserWithoutPassword(_user._id);
      if (_userInfo.status === "Active") {
        const token = jwt.sign(_userInfo, process.env.SECRET, {
          expiresIn: "1h",
        });
        return res.json({ success: true, token: token });
      }
      else {
        return res.status(401).send("Email is not activated");
      }
    }
  } else if (!email || !password) {
    return res.status(400).send("Please enter email and password.");
  }
  return res.status(401).send("Email or password is not correct.");
});

router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
