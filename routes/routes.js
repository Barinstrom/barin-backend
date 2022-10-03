const express = require("express");
const router = express.Router();
const register = require("../services/users/unauth/register");
const login = require("../services/users/unauth/login");
const forgotpassword = require("../services/users/unauth/forgotpassword");
const updatepassword = require("../services/users/unauth/updatepassword");
const verifyUser = require("../middleware/verifyUser");
const getAllSchoolID = require("../services/users/unauth/getAllSchoolID");
require("dotenv").config();

router.get("/", (req, res) => {
   res.send(
      "Hello BARIN API you can see docs on https://barin-api-doc.tawanchai.com/"
   );
});
router.get("/getAllSchoolID", getAllSchoolID);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/updatepassword", updatepassword);
router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
