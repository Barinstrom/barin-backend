const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../../../models/user");
const SchoolModel = require("../../../models/school");
const AdminModel = require("../../../models/admin");
const { cloudinary } = require("../../../utils/cloudinary");
const { sender } = require("../../../utils/mail");

require("dotenv").config();
const register = async (req, res) => {
   const {
      email,
      password,
      confirmPassword,
      schoolID,
      schoolName,
      role,
      certificate_doc,
   } = req.body;

   if (password != confirmPassword)
      return res.status(400).send("Password is not same.");
   if ((!email, !password, !role, !schoolID)) {
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

   const token = jwt.sign({ email: email }, process.env.SECRET, {
      expiresIn: "7d",
   });
   const school = await SchoolModel.findOne({ schoolID }).exec();
   const schoolByName = await SchoolModel.findOne({ schoolName }).exec();
   const checkuser = await UserModel.findOne({ email }).exec();
   //console.log(school,schoolByName)
   if (!school && !schoolByName && !checkuser) {
      const schoolData = {
         schoolID,
         schoolName,
         urlCertificateDocument: url_doc,
         paymentStatus: "pending",
         status: "pending", // 0=pending -1=reject 1=approve
         paymentDate: new Date(),
         // request , club , schedule urllog bgcolor => null at this point
      };
      await SchoolModel.create(schoolData);

      const data = {
         email,
         role,
         schoolID,
         password: hashPassword,
         status: "Pending",
         confirmationCode: token,
      };

      const user = new UserModel(data);
      const _user = await user.save();
      await AdminModel.create({ userID: _user._id });
      sender(data.email, data.email, data.confirmationCode);
      return res.json({ success: true, data: _user });
   } else if (school) {
      return res.status(400).send("SchoolID is already exist.");
   } else if (schoolByName) {
      return res.status(400).send("Your school is already registered.");
   } else {
      return res.status(400).send("user already exist");
   }
};

module.exports = register;
