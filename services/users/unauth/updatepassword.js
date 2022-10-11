const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../../models/user");

require("dotenv").config();
const updatepassword = async (req, res) => {
   const { newPassword, confirmNewPassword, token } = req.body;
   if (token) {
      jwt.verify(
         token,
         process.env.RESET_PASSWORD_KEY,
         async (error, decodedData) => {
            if (error) {
               return res.status(400).send("Incorrect token or it is expired");
            }
            UserModel.findOne({ resetToken: token }, (err, user) => {
               if (err || !user) {
                  return res
                     .status(400)
                     .send("User with this token does not exist");
               }
               if (newPassword != confirmNewPassword) {
                  return res.status(400).send("Password is not same");
               }
               const hashPassword = bcrypt.hashSync(newPassword, 10);

               user.password = hashPassword;
               user.status = "Active";
               user.save((err, result) => {
                  if (err) {
                     return res.status(400).send("Reset Password Error");
                  } else {
                     return res
                        .status(200)
                        .send("Your password has been changed");
                  }
               });
            });
         }
      );
   } else {
      return res.status(401).json({ error: "Authentication Error" });
   }
};

module.exports = updatepassword;
