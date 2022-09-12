const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../../../services/users");

require("dotenv").config();
const login = async (req, res) => {
   const { email, password } = req.body;
   const _user = await userService.getUserByUsername(email);
   if (_user) {
      if (bcrypt.compareSync(password, _user.password)) {
         const _userInfo = await userService.getUserWithoutPassword(_user._id);
         if (_userInfo.status === "Active") {
            const token = jwt.sign(_userInfo, process.env.SECRET, {
               expiresIn: "1h",
            });
            return res.json({
               success: true,
               token: token,
               schoolID: _user.schoolID,
            });
         } else {
            return res.status(401).send("Email is not activated");
         }
      }
   } else if (!email || !password) {
      return res.status(400).send("Please enter email and password.");
   }
   return res.status(401).send("Email or password is not correct.");
};

module.exports = login;
