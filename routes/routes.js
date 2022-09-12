const express = require("express");
const router = express.Router();
const register = require("../services/users/unauth/register");
const login = require("../services/users/unauth/login");
const forgotpassword = require("../services/users/unauth/forgotpassword");
const updatepassword = require("../services/users/unauth/updatepassword");
const verifyUser = require("../middleware/verifyUser");

require("dotenv").config();

<<<<<<< HEAD
router.route("/register").post(async (req, res) => {
  const { email, password, confirmPassword,schoolID,schoolName, role, certificate_doc } =
    req.body;

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
    await SchoolModel.create(schoolData);

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
  else if(school){
    return res.status(400).send("SchoolID is already exist.");
  }
  else if(schoolByName){
    return res.status(400).send("Your school is already registered.");
  }
  else{
    return res.status(400).send("user already exist");
  }

=======
router.get("/", (req, res) => {
   res.send(
      "Hello BARIN API you can see docs on https://barin-api-doc.vercel.app/ "
   );
>>>>>>> 3ddf97aba3401be000a5d3501bf0094f3c22b7b5
});
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/updatepassword", updatepassword);
router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
