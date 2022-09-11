const express = require("express");
const router = express.Router();
const register = require("../services/users/unauth/register");
const login = require("../services/users/unauth/login");
const forgotpassword = require("../services/users/unauth/forgotpassword");
const updatepassword = require("../services/users/unauth/updatepassword");
const verifyUser = require("../middleware/verifyUser");

require("dotenv").config();

router.get("/", (req, res) => {
   res.send(
      "Hello BARIN API you can see docs on https://barin-api-doc.vercel.app/ "
   );
});
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/updatepassword", updatepassword);
router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
