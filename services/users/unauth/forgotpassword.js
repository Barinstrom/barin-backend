const jwt = require("jsonwebtoken");
const UserModel = require("../../../models/user");
const { forgot_pass } = require("../../../utils/forgot_password");

require("dotenv").config();
const forgotpassword = async (req, res) => {
   const { email } = req.body;
   if (!email)
      return res
         .status(401)
         .send("Please enter your email that you want to reset.");
   const _user = await UserModel.findOne({ email }).exec();
   if (_user) {
      const token = jwt.sign({ email: email }, process.env.RESET_PASSWORD_KEY, {
         expiresIn: "15m",
      });
      forgot_pass(email, email, token);
      let reseted = await _user.updateOne({ resetToken: token });
      if (reseted) {
         res.status(200).json({
            message: "Email has been sent,Please check your email.",
         });
      } else {
         res.status(401).json({ message: "Can not edit database." });
      }
   } else {
      return res
         .status(401)
         .json({ message: "Email is not exist on database." });
   }
};

module.exports = forgotpassword;
